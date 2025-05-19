import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
    return (
        <Card className="shadow-lg p-3 my-5 rounded bg-product-card">
   
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant="top"
                    className="rounded"
                    alt={product.name} 
                />
            </Link>

            <Card.Body>
              
                <Link
                    to={`/product/${product._id}`}
                    className="text-decoration-none"
                >
                    <Card.Title as="h5" className="product-title">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

              
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
