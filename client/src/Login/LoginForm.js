import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit({ username, password });
  };

  return (
    <div className="container-fluid">
      <div className="row main-content bg-success text-center">
        <div className="col-md-4 text-center company__info">
          <span className="company__logo">
            <h2>
              <span className="fa fa-android"></span>
            </h2>
          </span>
          <h4 className="company_title">Meme Generator</h4>
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
          <div className="container-fluid">
            <div class="row">
              <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" className="row">
                  <Form.Control
                    type="email"
                    name="username"
                    id="username"
                    className="form__input"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg" className="row">
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    className="form__input"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg" className="row">
                  <Button
                    type="submit"
                    disabled={!validateForm()}
                    className="btn"
                  >
                    Log in
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
