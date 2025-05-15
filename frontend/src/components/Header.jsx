import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'

function Header() {
  return (
      <header>
          <Navbar
              className="custom-navbar fw-bold"
              expand="md"
              collapseOnSelect
          >
              <Container>
                  <Navbar.Brand style={{ color: "gray", fontSize:"30px" }} href="/">
                      DigiShop
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="ms-auto">
                          <Nav.Link href="/cart">
                              <FaShoppingCart /> Cart
                          </Nav.Link>
                          <Nav.Link href="/">
                              <FaUser /> Login
                          </Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
      </header>
  );
}

export default Header
