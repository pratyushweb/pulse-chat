import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/me");
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth: ", error.message);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data, toast) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            if (toast) toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            if (toast) toast.error(error.response?.data?.error || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data, toast) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            if (toast) toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            if (toast) toast.error(error.response?.data?.error || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async (toast) => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            if (toast) toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            if (toast) toast.error(error.response?.data?.error || "Logout failed");
        }
    },

    forgotPassword: async (data, toast) => {
        try {
            const res = await axiosInstance.post("/auth/forgot-password", data);
            if (toast) toast.success(res.data.message);
            return true;
        } catch (error) {
            if (toast) toast.error(error.response?.data?.error || "Failed to send OTP");
            return false;
        }
    },

    verifyOTP: async (data, toast) => {
        try {
            const res = await axiosInstance.post("/auth/verify-otp", data);
            if (toast) toast.success(res.data.message);
            return true;
        } catch (error) {
            if (toast) toast.error(error.response?.data?.error || "Invalid OTP");
            return false;
        }
    },

    resetPassword: async (data, toast) => {
        try {
            const res = await axiosInstance.post("/auth/reset-password", data);
            if (toast) toast.success(res.data.message);
            return true;
        } catch (error) {
            if (toast) toast.error(error.response?.data?.error || "Password reset failed");
            return false;
        }
    },

    connectSocket: () => {
        const { authUser, socket } = get();
        // If unauthenticated or already connected, do nothing
        if (!authUser || socket?.connected) return;

        // Dynamically connect to Production or Localhost Sockets
        const BACKEND_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : import.meta.env.VITE_BACKEND_URL;

        const newSocket = io(BACKEND_URL, {
            query: {
                userId: authUser._id,
            },
        });
        
        newSocket.connect();
        set({ socket: newSocket });

        // Listen for updates to online users from the socket server
        newSocket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket && socket.connected) {
            socket.disconnect();
            set({ socket: null, onlineUsers: [] });
        }
    },
}));
