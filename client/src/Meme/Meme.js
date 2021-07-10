import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
import Footer from "../Common/Footer";
import { Container, Row, Col, Button } from "react-bootstrap/";

function Meme(props) {
  return (
    <Container fluid className="page-container">
      <Row id="content-wrap"></Row>
      <Row>
        <Footer></Footer>
      </Row>
    </Container>
  );
}

export default withRouter(Meme);
