import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Use a dynamic CLIENT_URL if it exists, otherwise allow localhost for development
const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL || "http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});

const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    
    // Extracted from socket handshake query from frontend
    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // broadcast to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle typing indicator
    socket.on("typing", ({ to, typing }) => {
        const receiverSocketId = getReceiverSocketId(to);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("typing", {
                isTyping: typing,
                userId
            });
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        if (userId) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

export { app, io, server };
