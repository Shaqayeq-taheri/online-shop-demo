import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";


function Header() {
    return (
        <header>
            <Navbar
                className="custom-navbar fw-bold"
                expand="md"
                collapseOnSelect
            >
                <Container>
                    <Link
                        to="/"
                        className="navbar-brand"
                        style={{ color: "gray", fontSize: "30px" }}
                    >
                        DigiShop
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/cart" className="nav-link">
                                <FaShoppingCart /> Cart
                            </Link>
                            <Link to="/signin" className="nav-link">
                                <FaUser /> Login
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
