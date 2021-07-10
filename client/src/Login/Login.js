import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import LoginForm from "./LoginForm";
import API from "../API";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
// logOut
//username
function Login(props) {
  let history = useHistory();
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
        username={props.loggedIn ? "Hi " + props.user.name : "sara"}
      />
      <div id="content-wrap">
        <LoginForm handleSubmit={doLogIn} />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default withRouter(Login);
