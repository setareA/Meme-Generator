import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./Styles/index.css";
import reportWebVitals from "./reportWebVitals";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Meme from "./Meme/Meme";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/meme/:id" component={Meme} />
        <Route exact path="/home" component={Home} />
        <Redirect to="/home" />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
