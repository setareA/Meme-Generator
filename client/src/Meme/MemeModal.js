import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Modal,
  Form,
} from "react-bootstrap/";
import { useEffect, useState } from "react";

/*  show
    images
    handleClose
    setupdateMemeList
*/
/*
"id": 1,
        "imgAddr": "newimageaddre",
        "field": [
            {
                "pos": "ttt"
            }
 */
/*
"imgId": "1",
    "visibility": "public",
    "title": "notshouldbe",
    "font":"",
    "color":"",
    "field":[{"text": "kk", "pos":"op"} , {"text": "jj", "pos":"toptop"} ]
 */
const MemeModal = (props) => {
  const handleAdd = (event) => {
    event.preventDefault();
    // then after post  setupdateMemeList((update))
  };
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Meme Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group></Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemeModal;
