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

    connectSocket: () => {
        const { authUser, socket } = get();
        // If unauthenticated or already connected, do nothing
        if (!authUser || socket?.connected) return;

        // Initialize connection
        const newSocket = io("http://localhost:5000", {
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
