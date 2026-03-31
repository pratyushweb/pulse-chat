import axios from "axios";

export const axiosInstance = axios.create({
    // Automatically switch between localhost VITE proxy and production Render URL
    baseURL: import.meta.env.MODE === "development" ? "/api" : (import.meta.env.VITE_BACKEND_URL + "/api"),
    withCredentials: true, // Send cookies in every request (for JWT)
});
