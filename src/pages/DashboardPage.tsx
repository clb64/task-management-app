import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { useProjects } from '../hooks/useProjects';
import { Task, Project, TaskStatus } from '../types';
import Button from '../components/Button';

export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks, loading: tasksLoading } = useTasks();
  const { projects, loading: projectsLoading } = useProjects();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="mt-2 text-gray-600">Please log in to access your dashboard.</p>
          <Link to="/login" className="mt-4 inline-block">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const recentTasks = tasks.slice(0, 5);
  const todoTasks = tasks.filter(task => task.status === TaskStatus.TODO);
  const inProgressTasks = tasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
  const completedTasks = tasks.filter(task => task.status === TaskStatus.DONE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here&apos;s an overview of your tasks and projects.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{todoTasks.length}</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    To Do
                  </dt>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{inProgressTasks.length}</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    In Progress
                  </dt>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{completedTasks.length}</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Completed
                  </dt>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{projects.length}</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Projects
                  </dt>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Tasks
            </h3>
            {tasksLoading ? (
              <p className="text-gray-500">Loading tasks...</p>
            ) : recentTasks.length > 0 ? (
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.project?.name}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.status === TaskStatus.DONE
                        ? 'bg-green-100 text-green-800'
                        : task.status === TaskStatus.IN_PROGRESS
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No tasks yet. Create your first task!</p>
            )}
            <div className="mt-4">
              <Link to="/tasks">
                <Button variant="secondary" size="sm">View All Tasks</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Projects
            </h3>
            {projectsLoading ? (
              <p className="text-gray-500">Loading projects...</p>
            ) : projects.length > 0 ? (
              <div className="space-y-3">
                {projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{project.name}</p>
                      {project.description && (
                        <p className="text-xs text-gray-500">{project.description}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {project._count?.tasks || 0} tasks
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No projects yet. Create your first project!</p>
            )}
            <div className="mt-4">
              <Link to="/projects">
                <Button variant="secondary" size="sm">View All Projects</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}