import { Row, Col } from "react-bootstrap";
import axios from 'axios'
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";



function Home() {
    const [products, setProducts]= useState([])
    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get("/api/products/getAllProducts");
                console.log("API Response:", data);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProduct()

    },[]) // the array is empty because we fetch the data one time 

  console.log('this is my products array',products)
    return (

        <>
        <h1>Welcome to DigiShop</h1>
            <h3>Latest Products</h3>
            <Row className="g-4">
            {products.map((product) => (
                    <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard product={product} />
                    </Col>))}
            </Row>
        </>
    );
}

export default Home;

//Bootstrap's grid has 12 columns per row. You assign how many of those 12 columns each item should take depending on screen size
//xs 12/12 means 1 item per a row, md 6/12 means 2 items per row



/*       {products.map((product) => (
                    <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Col>
                ))} */