import express from 'express'
import { createProduct,getAllProducts,getProductById } from '../controllers/productControllers.js';

const router = express.Router()

router.post("/addProduct", createProduct)
router.get("/getAllProducts", getAllProducts);
router.get("/:id", getProductById);

export default router