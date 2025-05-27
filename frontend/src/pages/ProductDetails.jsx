import { useParams,useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Form,Row, Col, ListGroup, Card, Image, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setProduct,
    setLoading,
    setError,
} from "../../redux/slices/productSlice";
import {addToCart} from '../../redux/slices/cartSlice'
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";


function ProductDetails() {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.product);
    const [quantity, setQuantity]= useState(1)
    const navigate= useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                dispatch(setLoading(true));
                const { data } = await axios.get(`/api/products/${productId}`);
                dispatch(setProduct(data));
            } catch (err) {
                dispatch(
                    setError(
                        err.response?.data?.message ||
                            err.message ||
                            "Failed to load product details"
                    )
                );
            }
        };

        fetchProduct();
    }, [productId, dispatch]);


    const addToCartHandler = ()=>{
        dispatch(addToCart({...product, quantity}))
        navigate('/cart')

    }
    console.log('the list of added products',product)
    console.log('the number of added product',quantity)

    return (
        <div className="py-3">
            <Link className="btn btn-light my-3" to="/">
                <FaArrowLeft /> Go Back
            </Link>

            {loading ? (
              <Loader/>
            ) : error ? (
                <Message variant={danger}>Error: {error}</Message>
            ) : product ? (
                <Row>
                    {/* Product Image Column */}
                    <Col xs={12} md={5} lg={5} className="mb-4">
                        <div
                            className="p-3 border rounded bg-light d-flex justify-content-center align-items-center"
                            style={{ minHeight: "400px" }}
                        >
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                                style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    </Col>

                    {/* Product Details Column */}
                    <Col xs={12} md={6} lg={4} className="mb-4">
                        <ListGroup variant="flush" className="border rounded">
                            <ListGroup.Item className="p-3">
                                <h2 className="mb-3">{product.name}</h2>
                                <div className="mb-3">
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </div>
                                <h4 className="mb-3">
                                    Price: ${product.price}
                                </h4>
                                <p className="mb-0">{product.description}</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    {/* Add to Cart Column */}
                    <Col lg={3} className="mb-4">
                        <Card className="shadow-sm">
                            <ListGroup variant="flush">
                                <ListGroup.Item className="p-3">
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col className="text-end">
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item className="p-3">
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col className="text-end">
                                            {product.countInstock > 0 ? (
                                                <span className="text-success">
                                                    In Stock
                                                </span>
                                            ) : (
                                                <span className="text-danger">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInstock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Select the quantity</Col>
                                            <Col><Form.Select as='select' value={quantity}
                                            onChange={(e)=>setQuantity(Number(e.target.value))}>
                                                {
                                                    [...Array(product.countInstock).keys()].map((x)=>(
                                                        <option key={x+1} value={x+1}>
                                                                    {x+1}
                                                        </option>
                                                    ))  //creates an array with the size of the number of products, because we do not want to someone order a product which is more that numberinstock
                                                }</Form.Select></Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item className="p-3">
                                    <Button
                                        variant="dark"
                                        className="w-100 py-2"
                                        disabled={product.countInstock === 0}
                                        onClick={addToCartHandler}
                                    >
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <p variant="info">Product not found</p>
            )}
        </div>
    );
}

export default ProductDetails;
