import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in MS
        httpOnly: true, // prevent XSS attacks
        sameSite: "none", // Must be "none" for cross-origin Vercel to Render cookies natively
        secure: true,     // Force secure HTTPS cookies unconditionally so it doesn't fail
    });
};
