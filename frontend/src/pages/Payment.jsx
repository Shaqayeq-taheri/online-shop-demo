import { useEffect, useState } from "react";
import { Form, Button, Col, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../redux/slices/cartSlice";

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const shippingAddress = useSelector((state) => state.cart.shippingAddress);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shippingAddress) {
            navigate("/shipping");
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-5 mb-20"
            style={{ maxHeight: "100vh" }}
        >
            <Card
                className="p-4 shadow"
                style={{ width: "100%", maxWidth: "500px" }}
            >
                <h2 className="mb-4 text-center">Payment Method</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as="legend" className="mb-2">
                            Select Method
                        </Form.Label>
                        <Col>
                            <Form.Check
                                type="radio"
                                className="my-2"
                                label="PayPal or Credit Card"
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                checked
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />
                        </Col>
                    </Form.Group>
                    <div className="d-grid mt-4">
                        <Button type="submit" variant="dark" size="lg">
                            Continue
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default Payment;
