import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap/";
import { useEffect, useState } from "react";
import API from "../API";

function Home(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        await API.getUserInfo().then((user) => {
          console.log(user);
          setUser(user);
        });
        setLoggedIn(true);
      } catch (err) {
        console.error(err.error);
      }
    };
    checkAuth();
  }, []);
  return (
    <Container fluid>
      <Row>
        <Header
          logOut={props.logOut}
          username={loggedIn ? "Hi " + user.name : "sara"}
        />
      </Row>
      <Row>
        home <img src="/image.png" alt="tt" />
      </Row>
      <Row>
        <Footer></Footer>
      </Row>
    </Container>
  );
}

export default withRouter(Home);
