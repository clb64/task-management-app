export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatPriority = (priority: string): string => {
  return priority.replace('_', ' ').toLowerCase();
};

export const formatStatus = (status: string): string => {
  return status.replace('_', ' ').toLowerCase();
};