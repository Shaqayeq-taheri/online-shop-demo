import express from "express";
import {
    signupUser,
    signinUser,
    signoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/userControllers.js";

import { authenticate, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//public routes
router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/signout", signoutUser);

//protected user routes
router.get("/getUserProfile", authenticate, getUserProfile);
router.put("/updateUserProfile", authenticate, updateUserProfile);

//admin routes
router.get("/getAllUsers", authenticate, admin, getAllUsers);
router.get("/getUserById/:id", authenticate, admin, getUserById);
router.put("/updateUser/:id", authenticate, admin, updateUser);
router.delete("/deleteUser/:id", authenticate, admin, deleteUser);

export default router;
