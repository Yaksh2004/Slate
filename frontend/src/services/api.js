import axios from "axios";

const api = data => {
  return axios.create({
    baseURL: "http://localhost:8000",
  });
};

export default api;
