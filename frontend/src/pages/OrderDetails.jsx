import { Link, useParams } from "react-router-dom";
import { Row, Col,Image, Card, Button, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useEffect } from "react";
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
                const { data } = await axios.get(`/api/orders/${orderId}`);
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
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger" />
            ) : (
                <>
                    <h2>Order summary </h2>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>Shipping to </h3>
                                    <p>
                                        <strong>Name: </strong>
                                        {orderItems?.user?.firstName}
                                    </p>
                                    <p>
                                        <strong>Family Name: </strong>
                                        {orderItems?.user?.familyName}
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        {
                                            orderItems?.shippingAddress?.address
                                        } ,{" "}
                                        {
                                            orderItems?.shippingAddress
                                                ?.postalCode
                                        }{" "}
                                        {orderItems?.shippingAddress?.city},{" "}
                                        {orderItems?.shippingAddress?.country}
                                    </p>

                                    {orderItems.isDelivered ? (
                                        <Message variant="success">
                                            Delivered at:{" "}
                                            {orderItems.deliveredAt}
                                        </Message>
                                    ) : (
                                        <Message variant="danger">
                                            Not Delievered!
                                        </Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>Payment Method: </h3>
                                    <p>{orderItems.paymentMethod}</p>
                                    <h3>Payment Status:</h3>
                                    {orderItems?.isPaid ? (
                                        <Message variant="success">
                                            Paid on: {orderItems.paidAt}{" "}
                                        </Message>
                                    ) : (
                                        <Message variant="danger">
                                            Not Paid!
                                        </Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>Order Items: </h3>

                                    {orderItems.orderItems?.map(
                                        (item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            style={{
                                                                width: "80px",
                                                                height: "80px",
                                                                objectFit:
                                                                    "cover",
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>col 2</Col>
                    </Row>
                </>
            )}
        </div>
    );
}

export default OrderDetails;
