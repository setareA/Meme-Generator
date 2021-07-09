import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import LoginForm from "./LoginForm";
// logOut
//username
function Login(props) {
  return (
    <div className="page-container">
      <Header logOut={props.logOut} username="setare" />
      <div id="content-wrap">
        <LoginForm />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;
