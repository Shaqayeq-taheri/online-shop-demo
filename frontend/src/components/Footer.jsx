import { Container,Row,Col } from "react-bootstrap"

function Footer() {
    const currectYear = new Date().getFullYear()
  return (
    <footer>
      <Container>
        <Row>
            <Col className="text-center py-3">
                <p>Digi Shop &copy; {currectYear} </p>
            </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
