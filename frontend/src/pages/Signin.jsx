import {
    Form,
    Container,
    Row,
    Col,
    Button,
    FormGroup,
    InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCredentials } from "../../redux/slices/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function Signin() {
    const dispatch = useDispatch();

    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    
    // need to be done 
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/users/signin", {
                email,
                password,
            });
            
            dispatch(setCredentials(response.data))
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Login failed. Please try again."
            );
        }
        console.log("submit");
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="p-4 rounded shadow-lg border mb-5 bg-body-tertiary">
                        <h2 className="mb-4 text-center">Sign In</h2>

                        {error && (
                            <Alert variant="danger" className="mb-4">
                                {error}
                            </Alert>
                        )}

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
                            
                            >
                              Sign In
                            </Button>

                            

                            
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
