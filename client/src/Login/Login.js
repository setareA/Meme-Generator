import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import LoginForm from "./LoginForm";
import API from "../API";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap/";
import { useEffect, useState } from "react";
// logOut
//username
function Login(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInuser, setLoggedInuser] = useState({});

  let history = useHistory();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        await API.getUserInfo().then((u) => {
          console.log(u);
          setLoggedInuser(u);
          setLoggedIn(true);
          history.push("/home");
        });
      } catch (err) {
        setLoggedIn(false);
        console.error(err);
      }
    };
    checkAuth();
  }, []);
  const doLogIn = async (credentials) => {
    try {
      console.log("inside doLogin");
      console.log(credentials);
      const user = await API.logIn(credentials);
      console.log(user);
      console.log("loggggin");
      setLoggedIn(true);
      history.push("/home");
      console.log("reach here");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container fluid className="page-container">
      <Row>
        <Header loggedIn={loggedIn} user={loggedInuser} />
      </Row>
      <Row id="content-wrap">
        <LoginForm handleSubmit={doLogIn} />
      </Row>
      <Row>
        <Footer></Footer>
      </Row>
    </Container>
  );
}

export default withRouter(Login);
