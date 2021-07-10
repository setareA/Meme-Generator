import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import LoginForm from "./LoginForm";
import API from "../API";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
// logOut
//username
function Login(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  let history = useHistory();

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
        history.push("/home");
      } catch (err) {
        console.error(err.error);
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
      props.setLoggedIn(true);
      history.push("/home");
    } catch (err) {
      console.log(err.error);
    }
  };
  return (
    <div className="page-container">
      <Header
        logOut={props.logOut}
        username={loggedIn ? "Hi " + user.name : "sara"}
      />
      <div id="content-wrap">
        <LoginForm handleSubmit={doLogIn} />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default withRouter(Login);
