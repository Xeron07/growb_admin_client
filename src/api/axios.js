import axios, { AxiosError } from "axios";
import { useLogin } from "../hooks/useAuth";

const axiosInstance = axios.create({
  baseURL: "https://growb-info.vercel.app",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("token");
    if (config.headers) config.headers.set("x-access-token", token);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError && error.response?.status === 403) {
      useLogin().signOut();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
