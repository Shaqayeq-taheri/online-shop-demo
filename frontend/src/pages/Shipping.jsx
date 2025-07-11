import { useState,useEffect } from "react";
import { Form, Button, Container, FormGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

function Shipping() {
    const  shippingAddress  = useSelector((state) => state.cart.shippingAddress);
    

    const [address, setAddress] = useState(shippingAddress?.address || "");
    const [city, setCity] = useState(shippingAddress?.city || "");
    const [postalCode, setPostalCode] = useState(
        shippingAddress?.postalCode || ""
    );
    const [country, setCountry] = useState(shippingAddress?.country || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (shippingAddress) {
            setAddress(shippingAddress.address || "");
            setCity(shippingAddress.city || "");
            setPostalCode(shippingAddress.postalCode || "");
            setCountry(shippingAddress.country || "");
        }
    }, [shippingAddress]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, postalCode, city, country }));
        navigate("/payment");
    };

    return (
        <Container className="w-50 rounded shadow-lg border bg-body-tertiary p-3 mt-2">
            <Form onSubmit={handleFormSubmit}>
                {/* address */}
                <FormGroup controlId="address" className="my-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </FormGroup>

                {/* postalcode */}
                <FormGroup controlId="postalCode" className="my-2">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </FormGroup>

                {/* city */}
                <FormGroup controlId="city" className="my-2">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </FormGroup>
                {/* country */}
                <FormGroup controlId="country" className="my-2">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </FormGroup>
                <Button type="submit" variant="dark" className="btn-block">
                    Continue
                </Button>
            </Form>
        </Container>
    );
}

export default Shipping;
