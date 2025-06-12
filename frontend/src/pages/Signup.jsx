import { Form, Container, Row, Col, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signin } from "../../redux/slices/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Signup() {
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
    const [firstName, setFirstName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            setError("password and confirm password do not match");
            setLoading(false);
            return;
        } else {
            try {
                const response = await axios.post("/api/users/signup", {
                    firstName,
                    familyName,
                    email,
                    password,
                });

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
        }
        console.log("submit");
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <div
                className="p-4 shadow rounded bg-white"
                style={{ width: "100%", maxWidth: "480px" }}
            >
                <h2 className="mb-4 text-center fw-semibold">Create Account</h2>

                <Form onSubmit={handleFormSubmit}>
                    {/* Name row */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formFirstName">
                                <Form.Label className="small text-muted">
                                    First Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    className="rounded-3"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formFamilyName">
                                <Form.Label className="small text-muted">
                                    Family Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Doe"
                                    value={familyName}
                                    onChange={(e) =>
                                        setFamilyName(e.target.value)
                                    }
                                    className="rounded-3"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Email */}
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label className="small text-muted">
                            Email Address
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-3"
                        />
                    </Form.Group>

                    {/* Password */}
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label className="small text-muted">
                            Password
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-start-3"
                            />
                            <InputGroup.Text
                                onClick={() => setShowPassword(!showPassword)}
                                className="bg-white rounded-end-3"
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    {/* Confirm Password */}
                    <Form.Group
                        controlId="formConfirmPassword"
                        className="mb-3"
                    >
                        <Form.Label className="small text-muted">
                            Confirm Password
                        </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Repeat password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="rounded-start-3"
                            />
                            <InputGroup.Text
                                onClick={() => setShowPassword(!showPassword)}
                                className="bg-white rounded-end-3"
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="dark"
                        className="w-100 rounded-3 py-2 mb-2"
                        disabled={loading}
                    >
                        Sign Up
                    </Button>

                    {loading && <Loader />}
                    {error && (
                        <p className="text-danger small text-center">{error}</p>
                    )}
                </Form>

                {/* Sign-in redirect */}
                <div className="text-center mt-3">
                    <small className="text-muted">
                        Already have an account?{" "}
                        <Link
                            to="/signin"
                            className="fw-bold text-decoration-none"
                        >
                            Sign in
                        </Link>
                    </small>
                </div>

                {/* Terms & Privacy */}
                <div className="text-center mt-3 small text-muted">
                    By signing up, you agree to our{" "}
                    <Link to="/terms" className="text-decoration-none">
                        Terms
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-decoration-none">
                        Privacy Policy
                    </Link>
                    .
                </div>
            </div>
        </Container>
    );
}

export default Signup;
