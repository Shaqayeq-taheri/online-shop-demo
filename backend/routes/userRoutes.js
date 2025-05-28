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

const router = express.Router();

//public routes
router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/signout", signoutUser);
router.get("/getUserProfile", getUserProfile);
router.put("/updateUserProfile", updateUserProfile);

//private routes(admin)
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
