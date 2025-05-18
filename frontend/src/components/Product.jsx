import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
    return (
        <Card className="shadow-lg p-3 my-5 rounded bg-product-card">
            {/* Wrap Card.Img directly in Link (no extra divs) */}
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant="top"
                    className="rounded"
                    alt={product.name} // Always include alt text
                />
            </Link>

            <Card.Body>
                {/* Simplify Link nesting */}
                <Link
                    to={`/product/${product._id}`}
                    className="text-decoration-none"
                >
                    <Card.Title as="h3" className="product-title">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                {/* Ensure Rating component handles props correctly */}
                <Card.Text as="div">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>

                <Card.Text as="h3" className="pt-3 price-product-color">
                    ${product.price}{" "}
                    {/* Move $ symbol before price for better UX */}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
