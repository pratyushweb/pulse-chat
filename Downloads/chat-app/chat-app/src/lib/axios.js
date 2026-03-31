import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "/api",
    withCredentials: true, // Send cookies in every request (for JWT)
});
