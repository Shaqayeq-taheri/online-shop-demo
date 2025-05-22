import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setProducts,
    setLoading,
    setError,
} from "../../redux/slices/productSlice";
import axios from "axios";

function Home() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product); //state.product name of productSlice

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(setLoading(true));
            try {
                const { data } = await axios.get(
                    "/api/products/getAllProducts"
                );
                dispatch(setProducts(data));
            } catch (error) {
                dispatch(setError(error.message));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchProducts();
    }, [dispatch]);

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <h1>Welcome to DigiShop</h1>
            <h3>Latest Products</h3>
            <Row className="g-4">
                {products.map((product) => (
                    <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Home;
