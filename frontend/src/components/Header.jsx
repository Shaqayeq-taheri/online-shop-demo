import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
    const { cartItems } = useSelector((state) => state.cart);
    const { currentUser } = useSelector((state) => state.user);

    const signOutHandler =()=>{
        console.log('sign out')
    }
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
                                {cartItems.length > 0 && (
                                    <Badge pill bg="danger" className="mx-2">
                                        {cartItems.reduce(
                                            (acc, item) => acc + item.quantity,
                                            0
                                        )}
                                    </Badge> //adds up the quantity of each item in the cartItems array.
                                )}
                            </Link>
                            {currentUser ? (
                                <NavDropdown
                                    title={`${currentUser.user.firstName} ${currentUser.user.familyName}`}
                                    id="username"
                                >
                                    <Link to="profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={signOutHandler}
                                        >
                                            Sign Out
                                        </NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            ) : (
                                <Link to="/signin" className="nav-link">
                                    <FaUser /> Sign In
                                </Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
