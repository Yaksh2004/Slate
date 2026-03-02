import api from "./api";

export const getProjects = async () => {
  return await api.get("/projects");
};

export const createProject = async data => {
  return await api.post("/projects", data);
};

export const deleteProject = async id => {
  return await api.delete(`/projects/${id}`);
};
