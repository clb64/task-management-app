import { useState, useEffect } from 'react';
import { Task, CreateTaskData, UpdateTaskData } from '../types';
import * as tasksService from '../services/tasks';

export function useTasks(projectId?: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksService.getTasks(projectId);
      setTasks(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data: CreateTaskData) => {
    const response = await tasksService.createTask(data);
    setTasks((prev) => [response.data, ...prev]);
    return response.data;
  };

  const updateTask = async (id: string, data: UpdateTaskData) => {
    const response = await tasksService.updateTask(id, data);
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? response.data : task))
    );
    return response.data;
  };

  const deleteTask = async (id: string) => {
    await tasksService.deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
}