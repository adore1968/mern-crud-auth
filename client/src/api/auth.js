import axios from "./axios";

export const registerRequest = (user) => {
  return axios.post("/auth/register", user);
};

export const loginRequest = (user) => {
  return axios.post("/auth/login", user);
};

export const logoutRequest = () => {
  return axios.post("/auth/logout");
};

export const verifyTokenRequest = () => {
  return axios.get("/auth/verify");
};
