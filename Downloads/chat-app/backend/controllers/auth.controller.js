import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { username, password, phoneNumber } = req.body;
        
        if (!username || !password || !phoneNumber) return res.status(400).json({ error: "Please fill in all fields" });

        const user = await User.findOne({ username });
        if (user) return res.status(400).json({ error: "Username already exists" });

        const phoneUser = await User.findOne({ phoneNumber });
        if (phoneUser) return res.status(400).json({ error: "Phone number already registered" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
            phoneNumber,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                profilePic: newUser.profilePic,
                phoneNumber: newUser.phoneNumber
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const user = await User.findOne({ phoneNumber });

        if (!user) return res.status(404).json({ error: "User not found with this phone number" });

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetOTP = otp;
        user.resetOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
        await user.save();

        // 🚨 SIMULATION: In a real app, you would use an SMS API (like Twilio) here.
        console.log(`\n---------------------------------`);
        console.log(`🔑 PASSWORD RESET OTP FOR ${phoneNumber}: ${otp}`);
        console.log(`---------------------------------\n`);

        res.status(200).json({ message: "OTP sent successfully to your mobile" });
    } catch (error) {
        console.log("Error in forgotPassword controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        const user = await User.findOne({ phoneNumber, resetOTP: otp, resetOTPExpires: { $gt: Date.now() } });

        if (!user) return res.status(400).json({ error: "Invalid or expired OTP" });

        res.status(200).json({ message: "OTP verified. You can now reset your password." });
    } catch (error) {
        console.log("Error in verifyOTP controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { phoneNumber, otp, newPassword } = req.body;
        const user = await User.findOne({ phoneNumber, resetOTP: otp, resetOTPExpires: { $gt: Date.now() } });

        if (!user) return res.status(400).json({ error: "Invalid or expired session" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetOTP = undefined;
        user.resetOTPExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.log("Error in resetPassword controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMe = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
