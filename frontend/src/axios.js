import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 🔥 ALWAYS send cookies
});
api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 401) {
      console.log("🚨 401 detected");
      console.log("URL:", error.response.config.url);
      console.log("Method:", error.response.config.method);
      console.log("Response Data:", error.response.data);
      console.log("Headers:", error.response.headers);
      // window.location.href = "/";
    }

    return Promise.reject(error);
  }
);
export default api;
