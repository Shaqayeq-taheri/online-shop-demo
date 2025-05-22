import Product from "../models/productModel.js";
import { StatusCodes } from "http-status-codes";

// @desc add a product 
// @route /api/products/addProduct
// @access  private(admin)
export const createProduct = async (req, res) => {
    console.log("Create product controller hit");
    try {
        const {
           // user: req.user._id
            name,
            image,
            brand,
            category,
            description,
            price,
            countInstock,
        } = req.body;

        // Create new product instance
        const product = new Product({
        
            name,
            image,
            brand,
            category,
            description,
            price,
            countInstock,
            reviews: [], // starts with empty reviews
            rating: 0,
            numReviews: 0,
        });

        const createdProduct = await product.save();

        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



// @desc fetch all products 
// @route /api/products/getAllProducts
// @access public
export const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(StatusCodes.OK).json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error while fetching products' });
      }
};



// @desc get a product by id 
// @route /api/products/:id
// @access public

export const getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error fetching product:", error);

        res.status(500).json({
            message: "Server error while fetching product",
        });
    }
};
