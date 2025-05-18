import { useParams,Link } from "react-router-dom"  //for getting the id from url
import { FaArrowLeft } from "react-icons/fa";
import {Row,Col, ListGroup, Card, Image} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from "axios";
import { useState, useEffect } from "react";


function ProductDetails() {

    const [product, setProduct]= useState({})
    const {id:productId}= useParams()
    
  
  useEffect(()=>{

    const fetchData = async ()=>{
        
        const {data} = await axios.get(`/api/products/${productId}`)
        const product = 
        setProduct(data)
    }
    fetchData()

  },[productId])
    console.log(product)
    return (
        <div className="mt-5 mb-5">
            <Link className="btn btn-light mb-3" to="/">
                <FaArrowLeft />
                Go Back
            </Link>
            <Row>
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <div className="h-100 bg-light p-3 rounded-3 d-flex align-items-center justify-content-center">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <div className="bg-light p-3 rounded-3">
                        <ListGroup variant="flush">
                            <ListGroup.Item className="border-0 bg-transparent py-3">
                                <h3 className="mb-2">{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 bg-transparent py-2">
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 bg-transparent py-2">
                                <h4 className="text-muted">${product.price}</h4>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 bg-transparent pt-2 pb-3">
                                <p className="mb-0">{product.description}</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Col>

                <Col xs={12} lg={4}>
                    <Card className="shadow-sm  bg-light">
                        <ListGroup variant="flush">
                            <ListGroup.Item className="py-3 bg-light">
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
