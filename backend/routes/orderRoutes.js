import express from "express";
import {
    getAllOrders,
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
} from "../controllers/orderController.js";
import { authenticate, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

//admin routes
router.get("/allOrders", authenticate, admin, getAllOrders);
router.put(
    "/getOrderById/:id/deliver",
    authenticate,
    admin,
    updateOrderToDelivered
);

//private routes
router.post("/createOrder", authenticate, createOrder);
router.get("/getMyOrders", authenticate, getMyOrders);
router.get("/:id", authenticate, getOrderById);
router.put("/:id/pay", authenticate, updateOrderToPaid);

export default router;
