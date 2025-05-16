import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
    return (
        <Card
            className="shadow-lg p-3 mt-5 mb-5  rounded bg-product-card"

        >
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant="top"
                    className="rounded"
                    
                />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div" className="product-title">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text>
                    <Rating value={product.rating} text={product.numReviews} />
                </Card.Text>

                <Card.Text as="h3" className="pt-5 price-product-color">
                    {product.price}$
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
