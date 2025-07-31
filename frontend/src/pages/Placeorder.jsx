import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";
import { clearCart } from "../../redux/slices/cartSlice";


function PlaceOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const {
        cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice = 0,
        shippingPrice = 0,
        taxPrice = 0,
        totalPrice = 0,
    } = cart;

    useEffect(() => {
        if (!shippingAddress) navigate("/shipping");
        else if (!paymentMethod) navigate("/payment");
    }, [paymentMethod, shippingAddress, navigate]);

    

    const placeOrderHandler = async () => {
        try {
            setLoading(true);

            const { data } = await axios.post("/api/orders/createOrder", {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            });
            toast.success("Your order was successfully placed");
            dispatch(clearCart());
            navigate(`/orders/${data._id}`);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Row className="mt-4">
                <Col md={8}>
                    <h3 className="mb-3">Review Your Order</h3>
                    <ListGroup
                        variant="flush"
                        className="shadow-lg rounded mb-4"
                    >
                        <ListGroup.Item>
                            <h5 className="fw-bold mb-2">Shipping Address</h5>
                            <p className="mb-1">
                                <strong>Address:</strong>{" "}
                                {shippingAddress.address},{" "}
                                {shippingAddress.city},{" "}
                                {shippingAddress.postalCode},{" "}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h5 className="fw-bold mb-2">Payment Method</h5>
                            <p className="mb-0">
                                <strong>Method:</strong> {paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h5 className="fw-bold mb-3">Order Items</h5>
                            {cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item
                                            key={index}
                                            className="py-3"
                                        >
                                            <Row className="align-items-center">
                                                <Col md={2}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item._id}`}
                                                        className="text-decoration-none"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col
                                                    md={4}
                                                    className="text-end"
                                                >
                                                    {item.quantity} x $
                                                    {item.price.toFixed(2)} ={" "}
                                                    <strong>
                                                        $
                                                        {(
                                                            item.quantity *
                                                            item.price
                                                        ).toFixed(2)}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card className="shadow-lg mt-5">
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h4 className="fw-bold mb-0">Order Summary</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col className="text-end">
                                        ${Number(itemsPrice).toFixed(2)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col className="text-end">
                                        ${Number(shippingPrice).toFixed(2)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col className="text-end">
                                        ${Number(taxPrice).toFixed(2)}
                                    </Col>
                                </Row>
                                <Row className="fw-bold">
                                    <Col>Total</Col>
                                    <Col className="text-end">
                                        ${Number(totalPrice).toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {error && (
                                <ListGroup.Item>
                                    <Message variant="danger">{error}</Message>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    variant="dark"
                                    className="w-100"
                                    disabled={cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                                {loading && <Loader />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default PlaceOrder;
