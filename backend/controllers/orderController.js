import { StatusCodes } from "http-status-codes";
import Order from "../models/orderModel.js";

// @desc fetch all orders
// @route GET /api/orders/allOrders
// @access admin
export const getAllOrders = async (req, res) => {
    res.send("get all orders");
};

// @desc create an order
// @route POST /api/createOrder
// @access private
export const createOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        paymentResult,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      
    } = req.body;

    try {
        if(orderItems && orderItems.length===0){
            res.status(StatusCodes.BAD_REQUEST).json({message:'there is no order in the list'})
        }else{
            const order = new Order({
                orderItems: orderItems.map((item) => ({
                    ...item,
                    product: item._id, //Takes the _id from the incoming item and puts it in the product field  
                    _id: undefined, //Ensures MongoDB will generate a new _id for this subdocument
                })),
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                paymentResult,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });

            const createdOrder = await order.save()

            res.status(StatusCodes.OK).json(createOrder)
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// @desc get an order
// @route GET /api/getMyOrders
// @access private
export const getMyOrders = async (req, res) => {
    res.send("get my orders");
};

// @desc get an order by Id
// @route GET /api/allOrders/:id
// @access private

export const getOrderById = async (req, res) => {
    res.send("get order by id");
};

// @desc update order to paid
// @route PUT /api/getOrderById/:id/pay
// @access private
export const updateOrderToPaid = async (req, res) => {
    res.send("update the order to paid");
};

// @desc update order to delivered
// @route PUT /api/getOrderById/:id/deliver
// @access private
export const updateOrderToDelivered = async (req, res) => {
    res.send("update the order to delivered");
};
