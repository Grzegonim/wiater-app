import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" className="justify-content-between rounded">
      <Navbar.Brand as={NavLink} to="/" className="px-2">
        Waiter.app
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
      </Nav>
    </Navbar>
  )
};

export default NavBar; 