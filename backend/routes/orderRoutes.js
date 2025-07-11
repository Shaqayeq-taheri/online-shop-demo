import express from "express";
import { getAllOrders, createOrder, getMyOrders, getOrderById } from "../controllers/orderController.js";
import { authenticate,admin } from "../middleware/authMiddleware.js";
const router = express.Router();


//admin routes
router.get("/allOrders",authenticate,admin, getAllOrders);

//private routes
router.post("/createOrder", authenticate,createOrder);
router.get('/getMyOrders',authenticate, getMyOrders)
router.get('/getOrderById/:id',authenticate,getOrderById)

export default router;
