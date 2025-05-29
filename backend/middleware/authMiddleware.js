import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import User from '../models/userModel.js'; 


//auth middleware for protected routes
 const authenticate = async (req, res, next) => {
     const token = req.cookies.jwt;

     if (!token) {
         return res
             .status(StatusCodes.UNAUTHORIZED)
             .json({ message: "Unauthorized - No token provided" });
     }

     try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ verify token
         req.user = await User.findById(decoded.userId).select("-password"); // optional: attach user

         next();
     } catch (error) {
         console.error("Token verification failed:", error);
         return res
             .status(StatusCodes.UNAUTHORIZED)
             .json({ message: "Unauthorized - Invalid token" });
     }
 };

//Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as admin");
    }
};

export { admin, authenticate };
