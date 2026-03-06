import api from "./api";

export const getTasksByProject = async projectId => {
  return await api.get(`/projects/${projectId}/tasks`);
};

export const createTask = async (projectId, data) => {
  return await api.post(`/projects/${projectId}/tasks`, data);
};

export const deleteTask = async (projectId, taskId) => {
  return await api.delete(`/projects/${projectId}/tasks/${taskId}`);
};

export const updateTask = async (projectId, taskId, data) => {
  return await api.patch(`/projects/${projectId}/tasks/${taskId}`, data);
};
