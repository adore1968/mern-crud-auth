import axios from "./axios";

export const registerUserRequest = (user) => {
  return axios.post(`/auth/register`, user);
};

export const loginUserRequest = (user) => {
  return axios.post(`/auth/login`, user);
};

export const verifyTokenRequest = () => {
  return axios.get("/auth/verify");
};
