import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import {signout} from '../../redux/slices/userSlice'
import axios from 'axios'



function Header() {
    const { cartItems } = useSelector((state) => state.cart);
    const { currentUser } = useSelector((state) => state.user);

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const signOutHandler = async () => {
        try {
            // call backend to clear cookie
            await axios.post(
                "/api/users/signout",
                {},
                { withCredentials: true }
            );
            dispatch(signout()); // clear localStorage
            navigate("/signin");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
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
                                    
                                        <NavDropdown.Item
                                            as={Link}
                                            to="/profile"
                                        >
                                            Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            as={Link}
                                            onClick={signOutHandler}
                                        >
                                            Sign Out
                                        </NavDropdown.Item>
                                    
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
