import React from "react";
import { Navbar, NavDropdown, Nav, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
import logo from "../Assets/logo/logo.png";

const Header = (props) => {
  return (
    <Navbar variant="dark" fixed="top" className="header">
      <Navbar.Brand href="/home">Meme Generator</Navbar.Brand>

      <Nav>
        <Navbar.Text className="mx-2">
          {props.user && props.user.name && `Welcome, ${props.user?.name}!`}
        </Navbar.Text>
        <Form inline className="mx-2">
          {props.loggedIn ? (
            <Button variant="outline-light" onClick={props.logout}>
              Logout
            </Button>
          ) : (
            <></>
          )}
        </Form>
      </Nav>
    </Navbar>
  );
};

export default Header;
