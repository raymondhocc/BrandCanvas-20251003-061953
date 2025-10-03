import React from 'react';
import { Paintbrush, PlusSquare, ChevronsUpDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectSummary } from '@/lib/types';
interface HeaderProps {
  projects: ProjectSummary[];
  currentProjectId: string | null;
  onSelectProject: (projectId: string) => void;
  onCreateProject: () => void;
}
export function Header({ projects, currentProjectId, onSelectProject, onCreateProject }: HeaderProps) {
  const currentProject = projects.find(p => p.id === currentProjectId);
  return (
    <header className="bg-brand-bg dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Paintbrush className="h-8 w-8 text-brand-primary dark:text-brand-bg" />
            <h1 className="text-3xl md:text-4xl font-illustrative text-brand-primary dark:text-brand-bg tracking-wider">
              BrandCanvas AI
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-between">
                  <span className="truncate">{currentProject?.title || "Select Project"}</span>
                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuLabel>My Projects</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {projects.map(project => (
                  <DropdownMenuItem key={project.id} onSelect={() => onSelectProject(project.id)}>
                    <span className="truncate flex-1">{project.title}</span>
                    {project.id === currentProjectId && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={onCreateProject}>
                  <PlusSquare className="h-4 w-4 mr-2" />
                  New Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle className="relative top-0 right-0" />
          </div>
        </div>
      </div>
    </header>
  );
}