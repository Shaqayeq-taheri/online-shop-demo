import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import {
    Col,
    Row,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";

function CartDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);
     

    const addToCartHandler = async (product, quantity) => {
        dispatch(addToCart({ ...product, quantity }));
    };
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkOutHandler =async()=>{
        navigate('/login?redirect=/shipping')  //if the user is logged in redirects to shipping page
    }

    return (
        <Row className="justify-content-center">
            <Col md={8}>
                <h1 className="mt-5 mb-4 ">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty{" "}
                        <Link
                            to="/"
                            style={{ textDecoration: "none", color: "#0d6efd" }}
                        >
                            Go Back
                        </Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item
                                key={item._id}
                                className="mb-3 p-3 bg-light shadow-sm rounded"
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
                                    <Col md={3}>
                                        <Link
                                            to={`/product/${item._id}`}
                                            style={{
                                                textDecoration: "none",
                                                fontWeight: "bold",
                                                color: "#333",
                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col
                                        md={2}
                                        className="text-muted fw-semibold"
                                    >
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Select
                                            value={item.quantity}
                                            onChange={(e) => {
                                                addToCartHandler(
                                                    item,
                                                    Number(e.target.value)
                                                );
                                            }}
                                            className="shadow-sm"
                                        >
                                            {[
                                                ...Array(
                                                    item.countInstock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            variant="light"
                                            className="rounded shadow-sm"
                                            title="Remove from cart"
                                            onClick={() =>
                                                removeFromCartHandler(item._id)
                                            }
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>
                                Subtotal (
                                {cartItems.reduce(
                                    (acc, item) => item.quantity + acc,
                                    0
                                )}
                                ) Items
                            </h3>
                            {cartItems
                                .reduce(
                                    (acc, item) =>
                                        item.quantity * item.price + acc,
                                    0
                                )
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to='/shipping'>
                            <Button
                                type="button"
                                variant="dark"
                                className="btn-block"
                                disabled={cartItems.length === 0}
                                onClick={()=>checkOutHandler}
                            >
                                Proceed to checkout
                            </Button>
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default CartDetails;
