import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
import logo from "../Assets/logo/logo.png";

const Header = (props) => {
  return (
    /*
    <nav className="header sticky-top py-1">
      <div className="container d-flex flex-column flex-md-row">
        <a
          className="d-inline-block h-100 p-1 "
          onClick={props.logOut}
          href="login"
        >
          log out{" "}
        </a>
        <a
          id="account"
          className="d-inline-block h-100 p-1 "
          href={props.username}
        >
          account
        </a>
        <div className="d-inline h-100 p-1" id="test">
          <div id="homelogo">
            {" "}
            <a href="home">
              <img className="header-img" src={logo} alt="logo" />{" "}
            </a>{" "}
          </div>
        </div>
      </div>
    </nav>
*/
    <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Brand href="#home">
        {" "}
        <img className="header-img" src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title={props.username} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">log out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
