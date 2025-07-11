// @desc fetch all orders
// @route GET /api/orders/allOrders
// @access admin
export const getAllOrders =async (req, res) => {
    res.send('get all orders')
};

// @desc create an order
// @route POST /api/createOrder
// @access private
export const createOrder =async (req, res) => {
    res.send('create an order')
};

// @desc get an order
// @route GET /api/getMyOrders
// @access private
export const getMyOrders =async (req, res) => {
    res.send("get my orders")
};

// @desc get an order by Id
// @route GET /api/allOrders/:id
// @access private

export const getOrderById =async(req, res) => {
    res.send('get order by id')
};

// @desc update order to paid
// @route PUT /api/getOrderById/:id/pay
// @access private
export const updateOrderToPaid = async(req, res) => {
    res.send('update the order to paid')
};

// @desc update order to delivered
// @route PUT /api/getOrderById/:id/deliver
// @access private
export const updateOrderToDelivered = async (req, res) => {
    res.send('update the order to delivered')
};
