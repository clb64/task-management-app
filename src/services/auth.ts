import { api } from './api';
import { AuthResponse, LoginData, RegisterData } from '../types';

export const login = (data: LoginData) => {
  return api.post<AuthResponse>('/auth/login', data);
};

export const register = (data: RegisterData) => {
  return api.post<AuthResponse>('/auth/register', data);
};