import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: "",
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    resetOTP: String,
    resetOTPExpires: Date,
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
