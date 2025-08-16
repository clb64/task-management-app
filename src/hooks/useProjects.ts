import { useState, useEffect } from 'react';
import { Project, CreateProjectData, UpdateProjectData } from '../types';
import * as projectsService from '../services/projects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsService.getProjects();
      setProjects(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data: CreateProjectData) => {
    const response = await projectsService.createProject(data);
    setProjects((prev) => [response.data, ...prev]);
    return response.data;
  };

  const updateProject = async (id: string, data: UpdateProjectData) => {
    const response = await projectsService.updateProject(id, data);
    setProjects((prev) =>
      prev.map((project) => (project.id === id ? response.data : project))
    );
    return response.data;
  };

  const deleteProject = async (id: string) => {
    await projectsService.deleteProject(id);
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  };
}