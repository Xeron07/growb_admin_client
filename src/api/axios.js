import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://growb-info.onrender.com/",
});

axiosConfig.defaults.headers.common["x-access-token"] =
  localStorage.getItem("token") || "";

export default axiosConfig;
