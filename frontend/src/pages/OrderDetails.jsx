import { Link, useParams } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    fetchOrdersRequest,
    fetchOrdersSuccess,
    fetchOrdersFail,
} from "../../redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";

function OrderDetails() {
    const { id: orderId } = useParams();

    const dispatch = useDispatch();
    const { orderItems, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        const fetchOrders = async () => {
            dispatch(fetchOrdersRequest());

            try {
                const { data } = await axios.get("/api/orders/getMyOrders");
                console.log("this is the list of orders", data);
                dispatch(fetchOrdersSuccess(data));
            } catch (error) {
                dispatch(
                    fetchOrdersFail(error.message || "something went wrong")
                );
                console.error(error);
            }
        };
        fetchOrders();
    }, [orderId, dispatch]);

    return (
        <div>
            <h2>Order summary </h2>
        </div>
    );
}

export default OrderDetails;
