import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageList from "./ImageList";
import { SketchPicker } from "react-color";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Modal,
  Dropdown,
  DropdownButton,
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
  const [selectedImage, setSelectedImage] = useState();
  const [title, setTitle] = useState();
  const [privateMeme, setPrivateMeme] = useState();
  const [font, setFont] = useState();
  const [color, setColor] = useState("#fff");
  const [field, setField] = useState([]);
  const handleAdd = (event) => {
    event.preventDefault();
    console.log(font);
    console.log(color);
    //check errors
    // post meme
    // .then after post  setupdateMemeList((update))
    setSelectedImage();
  };
  const handleClose = () => {
    console.log("closing modal");
    console.log(field);
    console.log(selectedImage);
    setSelectedImage();
    console.log(selectedImage);
    props.handleClose();
  };
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Meme Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <ImageList
              images={props.images}
              setSelectedImage={setSelectedImage}
              setField={setField}
            ></ImageList>
            {selectedImage && <span>image selected</span>}
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              as="textarea"
              rows={1}
              type="textArea"
              name="title"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group id="privateCheckbox">
            <Form.Check
              type="checkbox"
              label="Private"
              defaultChecked={privateMeme}
              onChange={(e) => setPrivateMeme(e.target.checked)}
            />
          </Form.Group>
          <Form.Group>
            <div key="inline-radio" className="mb-3">
              <Form.Check
                inline
                label="serif"
                name="group1"
                type="radio"
                id="serif"
                onChange={(e) =>
                  setFont(e.target.checked ? "serif" : "Cursive")
                }
                style={{ fontFamily: "serif" }}
              />
              <Form.Check
                inline
                label="Cursive"
                name="group1"
                type="radio"
                id="Cursive"
                onChange={(e) =>
                  setFont(e.target.checked ? "Cursive" : "serif")
                }
                style={{ fontFamily: "Cursive" }}
              />
            </div>
          </Form.Group>
          <Form.Group>
            <SketchPicker
              color={color}
              onChangeComplete={(color) => setColor(color.hex)}
            />
          </Form.Group>
          <Form.Group>
            {selectedImage &&
              selectedImage.field.map((ImageField) => (
                <>
                  <Form.Label>{ImageField.pos}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    type="textArea"
                    name="text"
                    placeholder="text"
                    onChange={(e) =>
                      setField((oldF) =>
                        oldF.map((fld) =>
                          fld.pos === ImageField.pos
                            ? { text: e.target.value, pos: ImageField.pos }
                            : fld
                        )
                      )
                    }
                  />
                </>
              ))}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
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
