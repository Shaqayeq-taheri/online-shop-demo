import { useParams,Link } from "react-router-dom"  //for getting the id from url
import products from "../../products"
import { FaArrowLeft } from "react-icons/fa";
import {Row,Col, ListGroup, Card, Image} from 'react-bootstrap'
import Rating from '../components/Rating'


function ProductDetails() {
    const {id:productId}= useParams()
    const product = products.find((p)=> p._id===productId) //find in products array the ps that their id is equal to productId(coming from url)
  console.log(product)
    return (
        <div className="mt-5 mb-5">


            <Link className="btn btn-light my-3" to="/">
                <FaArrowLeft />
                Go Back
            </Link>
            <Row>
                <Col xs={12} md={5} lg={5} className="mb-4">
                    <div className="bg-light p-3 rounded-3 h-100 d-flex align-items-center justify-content-center">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                            className="product-img"
                            style={{ maxHeight: "400px", objectFit: "contain" }}
                        />
                    </div>
                </Col>
                <Col xs={12} md={4} lg={4} className="mb-4">
                    <ListGroup variant="flush" className="border rounded-3">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={product.numReviews}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: {product.price} $
                        </ListGroup.Item>
                        <ListGroup.Item>{product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col xs={12} lg={3}>
                    <Card className="shadow-sm">
                        <ListGroup variant="flush">
                            <ListGroup.Item className="py-3">
                                <Row>
                                    <Col className="fw-bold">Price:</Col>
                                    <Col className="text-end fs-4">
                                        {product.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="py-3">
                                <Row>
                                    <Col className="fw-bold">Status:</Col>
                                    <Col className="text-end">
                                        {product.countInStock > 0 ? (
                                            <span className="text-success">
                                                Available
                                            </span>
                                        ) : (
                                            <span className="text-danger">
                                                Out of Stock
                                            </span>
                                        )}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="p-3">
                                <button
                                    className="btn btn-dark w-100 py-2"
                                    disabled={product.countInStock === 0}
                                >
                                    Add to Cart
                                </button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ProductDetails
