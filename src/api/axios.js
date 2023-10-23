import axios from "axios";

//"https://growb-info.onrender.com"
const axiosConfig = axios.create({
  baseURL: "http://localhost:7002",
  headers: {
    "Content-Type": "application/json",
    "x-access-token": localStorage.getItem("token") || "", // Include the access token
  },
});

export default axiosConfig;
