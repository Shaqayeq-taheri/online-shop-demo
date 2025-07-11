// @desc fetch all orders
// @route GET /api/orders/allOrders
// @access admin
export const getAllOrders =async (req, res) => {};

// @desc create an order
// @route POST /api/createOrder
// @access private
export const createOrder =async (req, res) => {};

// @desc get an order
// @route GET /api/getMyOrders
// @access private
export const getMyOrders =async (req, res) => {};

// @desc get an order by Id
// @route GET /api/allOrders/:id
// @access private

export const getOrderById =async(req, res) => {};

// @desc update order to paid
// @route PUT /api/getMyOrders/pay
// @access private
export const updateOrderToPaid = async(req, res) => {};

// @desc update order to delivered
// @route PUT /api/getMyOrders/:id/deliver
// @access private
export const updateOrderToDelivered = async (req, res) => {};
