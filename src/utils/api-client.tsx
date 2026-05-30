import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import logToServer from "./logToServer"; //

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // (removed extra space)
});

/* ---------------- REQUEST ---------------- */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/* ---------------- RESPONSE ERROR (IMPORTANT) ---------------- */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    logToServer({
      level: "error",
      message: error.message || "API Error",
      stackTrace: (error as any)?.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      // optional useful info:
      // @ts-ignore
      status: error.response?.status,
      // @ts-ignore
      endpoint: error.config?.url,
    });

    return Promise.reject(error);
  },
);

export default apiClient;
