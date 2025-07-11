// authMiddleware.js
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";


const authenticate = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies.jwt || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Not authorized, no token");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");

        if (!req.user) {
            res.status(StatusCodes.UNAUTHORIZED);
            throw new Error("User not found");
        }

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Not authorized, token failed");
    }
});

const admin = asyncHandler(async (req, res, next) => {
    if (!req.user?.isAdmin) {
        res.status(StatusCodes.FORBIDDEN);
        throw new Error("Not authorized as admin");
    }
    next();
});

export { authenticate, admin };
