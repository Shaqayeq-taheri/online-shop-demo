import { Form, Container, Row, Col, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signin } from "../../redux/slices/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); //useLocation returns an object
    const searchParams = new URLSearchParams(location.search); //gets the query string (?redirect=/profile)
    const redirect = searchParams.get("redirect") || "/"; //gets the value from the query like shipping or index page

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            navigate(redirect);
        }
    }, [currentUser, redirect]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("/api/users/signin", {
                email,
                password,
            });
            toast.success("Order placed successfully!");
            dispatch(signin(response.data));
            navigate(redirect);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Login failed. Please try again."
            );
            setError(
                error.response?.data?.message ||
                    "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
        console.log("submit");
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="p-4 rounded shadow-lg border mb-5 bg-body-tertiary">
                        <h2 className="mb-4 text-center">Sign In</h2>

                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group controlId="formEmail" className="mb-4">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-3"
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formPassword"
                                className="mb-3"
                            >
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="rounded-start-3"
                                    />
                                    <InputGroup.Text
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        style={{ cursor: "pointer" }}
                                        className="bg-white rounded-end-3"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="dark"
                                className="w-100 rounded-3 mb-3 py-2"
                                disabled={loading}
                            >
                                Sign In
                            </Button>
                            {loading && <Loader />}
                        </Form>

                        <div className="text-center mt-4">
                            <small className="text-muted">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-decoration-none fw-bold"
                                >
                                    Sign up here
                                </Link>
                            </small>
                        </div>
                    </div>

                    <div className="p-4 rounded shadow-sm border bg-body-tertiary text-center">
                        <p className="mb-0">
                            By signing in, you agree to our{" "}
                            <Link to="/terms" className="text-decoration-none">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                to="/privacy"
                                className="text-decoration-none"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Signin;
