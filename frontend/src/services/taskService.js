import api from "./api";

export const getTasksByProject = async projectId => {
  return await api.get(`/projects/${projectId}/tasks`);
};
