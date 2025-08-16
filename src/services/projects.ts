import { api } from './api';
import { Project, CreateProjectData, UpdateProjectData } from '../types';

export const getProjects = () => {
  return api.get<Project[]>('/projects');
};

export const createProject = (data: CreateProjectData) => {
  return api.post<Project>('/projects', data);
};

export const updateProject = (id: string, data: UpdateProjectData) => {
  return api.put<Project>(`/projects/${id}`, data);
};

export const deleteProject = (id: string) => {
  return api.delete(`/projects/${id}`);
};