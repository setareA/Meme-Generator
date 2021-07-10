import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Meme from "./Meme/Meme";
import API from "./API";
const App = () => {
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
    <div>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
          </Route>
          <Route exact path="/meme/:id">
            <Meme loggedIn={loggedIn} />
          </Route>
          <Route exact path="/home">
            <Home loggedIn={loggedIn} />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
