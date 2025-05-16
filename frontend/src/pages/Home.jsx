import {Row, Col} from 'react-bootstrap'
import products from '../../products'
import Product from '../components/Product'

function Home() {
  return (
      <>
          <h1>Latest Products</h1>
          <Row className="g-4">
              {products.map((product) => (
                  <Col key={product._id} sm={12} md={8} lg={4} xl={3}>
                      <Product product={product} />
                  </Col>
              ))}
          </Row>
      </>
  );
}

export default Home
