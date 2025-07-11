import { StatusCodes } from "http-status-codes";
import Order from "../models/orderModel.js";

// @desc fetch all orders
// @route GET /api/orders/allOrders
// @access admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("user", "firstName familyName email")
            .populate("oderItems.product", "name image price")
            .sort({ createdAt: -1 });

        res.status(StatusCodes.OK).json(orders);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
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
        if (orderItems && orderItems.length === 0) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "there is no order in the list",
            });
        } else {
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

            const createdOrder = await order.save();

            res.status(StatusCodes.CREATED).json(createdOrder);
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

// @desc get an order
// @route GET /api/getMyOrders
// @access private
export const getMyOrders = async (req, res) => {
    try {
        // Find orders only for the currently logged-in user
        const orders = await Order.find({ user: req.user._id }); //req.user._id coming from authenticate middleware
        res.status(StatusCodes.OK).json(orders);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

// @desc get an order by Id
// @route GET /api/allOrders/:id
// @access private

export const getOrderById = async (req, res) => {
    try {
        //{ timestamps: true } automatically adds: createdAt, updatedAt / -1 means: descending
        const order = await Order.findById(req.params._id)
            .sort({ createdAt: -1 })
            .populate("user", "firstName familyName email"); //populate for adding user name and email to the order , from 'user' collection ,first,lastname email fields

        if (order) {
            res.status(StatusCodes.OK).json(order);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "the order not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
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
