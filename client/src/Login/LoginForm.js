import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap/";

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
    <Container fluid>
      <div className="main-content text-center">
        <Col md={4} className="text-center company__info">
          <h4 className="company_title">Meme Generator</h4>
        </Col>
        <Col md={8} xs={12} sm={12} className="login_form ">
          <Container fluid>
            <Row>
              <Form onSubmit={handleSubmit} className="form">
                <Form.Group size="lg">
                  <Form.Control
                    type="email"
                    name="username"
                    id="username"
                    className="form__input"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg">
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    className="form__input"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg">
                  <Button
                    type="submit"
                    disabled={!validateForm()}
                    className="login_btn"
                  >
                    Log in
                  </Button>
                </Form.Group>
              </Form>
            </Row>
          </Container>
        </Col>
      </div>
    </Container>
  );
};

export default LoginForm;
