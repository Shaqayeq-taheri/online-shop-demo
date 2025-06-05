import { Form, Container, Row, Col, Button, FormGroup ,InputGroup} from "react-bootstrap";
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useState } from "react";
import {setCredentials} from '../../redux/slices/userSlice'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios'



function Signin() {

    const dispatch = useDispatch()

    const [error, setError] = useState(false)
    const [email, setEmail]= useState('')
    const [password, setPassword]=useState('')
    const [showPassword, setShowPassword]=useState(false)

    const handleFormSubmit =async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.post("/api/users/signin",{email,password});
            const data = response.data
        } catch (error) {
            
        }
        console.log('submit')
    }


    return (
        <Container className="mt-5" >
            <Row className="justify-content-center">
                <Col xs={12} md={5}>
                    <div className="p-4 rounded shadow-lg border mb-5 bg-body-tertiary">
                        <h2 className="mb-10 text-center">Sign In</h2>
                        <Form
                            onSubmit={handleFormSubmit}
                        
                        >
                            <Form.Group controlId="formEmail" className="mb-4">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-3"
                                    required
                                />
                            </Form.Group>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="rounded-start-3"
                                    required
                                />
                                <InputGroup.Text
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    style={{ cursor: "pointer" }}
                                    className="bg-white rounded-end-3"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </InputGroup.Text>
                            </InputGroup>

                            <Button
                                type="submit"
                                variant="dark"
                                className="w-100 rounded-3 mt-3"
                            >
                                Sign In
                            </Button>
                        </Form>

                        <div className="text-center mt-4">
                            <small>
                                Don't have an account?{" "}
                                <Link to="/signup">Sign up here</Link>
                            </small>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Signin;
