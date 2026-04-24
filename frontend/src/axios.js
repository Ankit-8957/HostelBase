import axios from "axios";

const api = axios.create({
  baseURL: "/api",       // ← requests go through Vercel proxy
  withCredentials: true, // ← cookies work now (same domain)
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("🚨 401 detected");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;