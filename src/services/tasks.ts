import { api } from './api';
import { Task, CreateTaskData, UpdateTaskData } from '../types';

export const getTasks = (projectId?: string) => {
  const params = projectId ? { projectId } : {};
  return api.get<Task[]>('/tasks', { params });
};

export const createTask = (data: CreateTaskData) => {
  return api.post<Task>('/tasks', data);
};

export const updateTask = (id: string, data: UpdateTaskData) => {
  return api.put<Task>(`/tasks/${id}`, data);
};

export const deleteTask = (id: string) => {
  return api.delete(`/tasks/${id}`);
};