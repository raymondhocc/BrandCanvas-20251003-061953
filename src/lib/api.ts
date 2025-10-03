import { GenerationFormState, Project, ProjectSummary, GeneratedVisual } from './types';
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network response was not ok' }));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'API request failed');
  }
  return result.data;
};
export const listProjects = (): Promise<ProjectSummary[]> => {
  return fetch('/api/projects').then(res => handleResponse<ProjectSummary[]>(res));
};
export const createProject = (title: string): Promise<ProjectSummary> => {
  return fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  }).then(res => handleResponse<ProjectSummary>(res));
};
export const getProject = (projectId: string): Promise<Project> => {
  return fetch(`/api/projects/${projectId}`).then(res => handleResponse<Project>(res));
};
export const updateProject = (projectId: string, projectData: Project): Promise<Project> => {
  return fetch(`/api/projects/${projectId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  }).then(res => handleResponse<Project>(res));
};
export const generateVisuals = (formData: GenerationFormState): Promise<GeneratedVisual[]> => {
    return fetch('/api/generate-visuals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    }).then(res => handleResponse<GeneratedVisual[]>(res));
};