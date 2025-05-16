import { Card } from "react-bootstrap";

function Product({ product }) {
    return (
        <Card
            className="shadow-lg p-3  bg-white rounded"
            style={{ height: "100%" }}
        >
            <a href={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant="top"
                    style={{ objectFit: "contain", height: "200px" }}
                />
            </a>

            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>

                <Card.Text as="h3" className="pt-5 price-product-color">
                    {product.price}$
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
