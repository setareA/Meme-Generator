import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import LoginForm from "./LoginForm";
import API from "../API";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Container, Row } from "react-bootstrap/";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

function Login(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInuser, setLoggedInuser] = useState({});

  let history = useHistory();

  useEffect(() => {
    const checkAuth = async () => {
      try {
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
  }, [history]);

  const doLogIn = async (credentials) => {
    try {
      console.log(credentials);
      const user = await API.logIn(credentials);
      console.log(user);

      setLoggedIn(true);
      history.push("/home");
    } catch (err) {
      console.log(err);
      toast.error("wrong credentials", {
        autoClose: 3000,
      });
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
      <ToastContainer />
    </Container>
  );
}

export default withRouter(Login);
