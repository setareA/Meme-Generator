import React from "react";
import { Navbar, NavDropdown, Nav, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
import logo from "../Assets/logo/logo.png";
import API from "../API";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  let history = useHistory();
  const logout = async () => {
    console.log("logging out");
    await API.logOut();
    history.push("/login");
  };
  return (
    <Navbar variant="dark" fixed="top" className="header">
      <Navbar.Brand href="/home">Meme Generator</Navbar.Brand>

      <Nav>
        <Navbar.Text className="mx-2">
          {props.user && props.user.name && `Welcome, ${props.user?.name}!`}
        </Navbar.Text>
        <Form inline className="mx-2">
          {props.loggedIn ? (
            <Button variant="outline-light" onClick={logout}>
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
