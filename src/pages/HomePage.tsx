import React, { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import { Header } from '@/components/brand-canvas/Header';
import { ControlSidebar } from '@/components/brand-canvas/ControlSidebar';
import { GenerationCanvas } from '@/components/brand-canvas/GenerationCanvas';
import { VisualEditor } from '@/components/brand-canvas/VisualEditor';
import { GenerationFormState, GeneratedVisual, Project, ProjectSummary } from '@/lib/types';
import * as api from '@/lib/api';
const DEFAULT_FORM_DATA: GenerationFormState = {
  productName: 'Cloudflare C3',
  description: 'A high-performance, secure, and scalable cloud computing platform for modern applications.',
  targetLocale: 'en-US',
  logoUrl: '',
  brandColors: ['#4338ca', '#db2777'],
};
export function HomePage() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [selectedVisual, setSelectedVisual] = useState<GeneratedVisual | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const loadProjects = useCallback(async () => {
    setIsProjectsLoading(true);
    try {
      const projectList = await api.listProjects();
      setProjects(projectList);
      if (projectList.length > 0 && !currentProjectId) {
        setCurrentProjectId(projectList[0].id);
      } else if (projectList.length === 0) {
        // This will be defined by the time loadProjects is called in useEffect
        // @ts-ignore
        handleCreateProject();
      }
    } catch (error) {
      toast.error('Failed to load projects.');
      console.error(error);
    } finally {
      setIsProjectsLoading(false);
    }
  }, [currentProjectId]);
  const handleCreateProject = useCallback(async () => {
    const newProjectTitle = `New Project ${new Date().toLocaleTimeString()}`;
    try {
      const newProjectSummary = await api.createProject(newProjectTitle);
      setProjects(prev => [newProjectSummary, ...prev]);
      setCurrentProjectId(newProjectSummary.id);
      setCurrentProject({
        id: newProjectSummary.id,
        title: newProjectSummary.title,
        formData: DEFAULT_FORM_DATA,
        visuals: [],
      });
      toast.success('New project created!');
    } catch (error) {
      toast.error('Failed to create new project.');
      console.error(error);
    }
  }, []);
  useEffect(() => {
    loadProjects();
  }, [loadProjects, handleCreateProject]);
  useEffect(() => {
    if (currentProjectId) {
      const load = async () => {
        setIsLoading(true);
        try {
          const projectData = await api.getProject(currentProjectId);
          setCurrentProject(projectData);
        } catch (error) {
          toast.error(`Failed to load project: ${currentProjectId}`);
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      load();
    }
  }, [currentProjectId]);
  const saveCurrentProject = useCallback(async (projectToSave: Project) => {
    if (!projectToSave.id) return;
    try {
      await api.updateProject(projectToSave.id, projectToSave);
      // Optimistically update project title in the list
      setProjects(prev => prev.map(p => p.id === projectToSave.id ? { ...p, title: projectToSave.title } : p));
    } catch (error) {
      toast.error('Failed to save project.');
      console.error(error);
    }
  }, []);
  const handleGenerate = async (data: GenerationFormState) => {
    if (!currentProject) return;
    setIsLoading(true);
    try {
      const newVisuals = await api.generateVisuals(data);
      const updatedProject = { ...currentProject, formData: data, visuals: newVisuals };
      setCurrentProject(updatedProject);
      await saveCurrentProject(updatedProject);
      toast.success('Visuals generated and project saved!');
    } catch (error) {
      toast.error('Oh no! Something went wrong while generating visuals.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditorSave = async (updatedVisual: GeneratedVisual) => {
    if (!currentProject) return;
    const updatedVisuals = currentProject.visuals.map(v => (v.id === updatedVisual.id ? updatedVisual : v));
    const updatedProject = { ...currentProject, visuals: updatedVisuals };
    setCurrentProject(updatedProject);
    await saveCurrentProject(updatedProject);
    toast.success('Visual updated and project saved!');
  };
  const handleVisualSelect = (visual: GeneratedVisual) => {
    setSelectedVisual(visual);
    setIsEditorOpen(true);
  };
  const handleEditorClose = () => {
    setIsEditorOpen(false);
    setSelectedVisual(null);
  };
  return (
    <div className="flex flex-col h-screen bg-brand-bg dark:bg-gray-900 font-sans">
      <Header 
        projects={projects}
        currentProjectId={currentProjectId}
        onSelectProject={setCurrentProjectId}
        onCreateProject={handleCreateProject}
      />
      <div className="flex flex-1 overflow-hidden">
        <ControlSidebar 
          onSubmit={handleGenerate} 
          isLoading={isLoading}
          formData={currentProject?.formData || null}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <GenerationCanvas
            visuals={currentProject?.visuals || []}
            isLoading={isLoading || isProjectsLoading}
            hasGenerated={(currentProject?.visuals.length ?? 0) > 0}
            onVisualSelect={handleVisualSelect}
          />
          <footer className="footer-note bg-brand-bg dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <p>
              AI capabilities are currently mocked. Full functionality requires API keys which cannot be securely stored in this environment.
              To enable, export the app to your GitHub, add your keys, and deploy.
            </p>
            <p className="mt-1">Built with ❤��� at Cloudflare</p>
          </footer>
        </div>
      </div>
      <VisualEditor
        visual={selectedVisual}
        isOpen={isEditorOpen}
        onClose={handleEditorClose}
        onSave={handleEditorSave}
      />
      <Toaster richColors position="top-right" />
    </div>
  );
}