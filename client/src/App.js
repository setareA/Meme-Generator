import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Meme from "./Meme/Meme";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/meme/:id">
            <Meme />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
