import axios from "./axios";

export const getTasksRequest = () => {
  return axios.get("/tasks");
};

export const getTaskRequest = (id) => {
  return axios.get(`/tasks/${id}`);
};

export const createTaskRequest = (task) => {
  return axios.post("/tasks", task);
};

export const updateTaskRequest = (id, task) => {
  return axios.put(`/tasks/${id}`, task);
};

export const deleteTaskRequest = (id) => {
  return axios.delete(`/tasks/${id}`);
};
