import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Row, Col, ListGroup, Card, Image, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setLoading, setError } from "../../redux/slices/productSlice";
import axios from "axios";


function ProductDetails() {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.product);

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

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                <FaArrowLeft /> Go Back
            </Link>

            {loading ? (
       <p>loading..</p>
            ) : error ? (
           <p>error occurred</p>
            ) : product ? (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0
                                                ? "In Stock"
                                                : "Out Of Stock"}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        className="btn-block"
                                        type="button"
                                        disabled={product.countInStock === 0}
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
        </>
    );
}

export default ProductDetails;
