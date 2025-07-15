import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";

function Placeorder() {
    const [orders, setOrder] = useState([]);
    const [loading, setLoading] = useState("true");
    const [error, setError] = useState("null");

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
        if (!shippingAddress) {
            navigate("/shipping");
        } else if (!paymentMethod) {
            navigate("/payment");
        }
    }, [paymentMethod, shippingAddress, navigate]);

    useEffect(() => {
        try {
            setLoading(true);
            const fetchOrders = async () => {
                const { data } = await axios.post("/api/orders/createOrder", {
                    orderItems: cartItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                });
            };

            fetchOrders();

            setLoading(false);
          
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }, []);

    return (
        <>
            <Row>
                <Col md={8}>Order Summary and Details here</Col>
                <Col md={4}>col 2</Col>
            </Row>
        </>
    );
}

export default Placeorder;
