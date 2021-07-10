import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
import { Container, Row, Col, Button } from "react-bootstrap/";

function Footer(props) {
  return (
    <Col sm={12} className="footer">
      <p>Copyright © 2021 MemeGenerator. All Rights Reserved</p>
    </Col>
  );
}

export default Footer;
