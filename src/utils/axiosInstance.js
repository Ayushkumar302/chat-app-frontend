import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL.replace(/\/$/, '') : "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: `${backendUrl}/api`,
  withCredentials: true,
});

export default axiosInstance;
