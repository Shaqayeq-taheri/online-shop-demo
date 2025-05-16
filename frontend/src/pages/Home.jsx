import {Row, Col} from 'react-bootstrap'
import products from '../../products'

function Home() {
  return (
    <>
<h1>Latest Products</h1>
<Row>
  {products.map((product)=>(
    <Col>
    <h3>{product.name} </h3>
    <img src={product.image} alt="" />
    </Col>
  ))}
</Row>
    </>
  )
}

export default Home
