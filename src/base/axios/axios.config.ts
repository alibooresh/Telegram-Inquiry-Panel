// src/axios/axios.config.ts
import axios, { AxiosError } from "axios";
import { useError } from "../context/ErrorContext";

const api = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 120000,
    headers: { "Content-Type": "application/json" },
});

// Request interceptor برای توکن
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// پاسخ‌ها
export const setupAxiosInterceptors = (showError: (msg: string) => void) => {
    api.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (!error.response) {
                showError("ارتباط با سرور برقرار نشد!");
            } else if (error.response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            } else {
                console.log(error.response.data)
                showError(error.response.statusText || `خطا: ${error.response.status}`);
            }
            return Promise.reject(error);
        }
    );
};

export default api;
