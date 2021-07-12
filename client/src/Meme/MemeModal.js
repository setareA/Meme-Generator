import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ImageList from "./ImageList";
import { SketchPicker } from "react-color";
import { toast } from "react-toastify";
import { Button, Modal, Form } from "react-bootstrap/";
import { useState } from "react";
import API from "../API";

const MemeModal = (props) => {
  const [selectedImage, setSelectedImage] = useState();
  const [title, setTitle] = useState(props.meme.title);
  const [privateMeme, setPrivateMeme] = useState(
    props.meme.visibility === "protected" ? true : false
  );
  const [font, setFont] = useState(props.meme.font);
  const [color, setColor] = useState(props.meme.color);
  const [field, setField] = useState(props.meme.field);

  const clearMeme = () => {
    setSelectedImage();
    setTitle();
    setPrivateMeme();
    setFont();
    setColor();
    setField([]);
  };
  const checkFormErrors = () => {
    let foundError = false;
    if (!title || title === "") {
      toast.info("🦄 title can not be null", { autoClose: 3000 });
      foundError = true;
    }
    if (!selectedImage && props.mode === "newMeme") {
      toast.info("🦄 select an image first", { autoClose: 3000 });
      foundError = true;
    }
    const emptyPos = field.filter((f) => f.text !== "");
    if (Object.keys(emptyPos).length === 0) {
      toast.info("🦄 at least one field should be filled", {
        autoClose: 3000,
      });
      foundError = true;
    }
    return foundError;
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (!checkFormErrors()) {
      const newMeme = {
        imgId: props.mode === "newMeme" ? selectedImage.id : props.images[0].id,
        visibility: privateMeme ? "protected" : "public",
        title: title,
        font: font,
        color: color,
        field: field,
      };
      if (props.mode === "newMeme") {
        API.addNewMeme(newMeme)
          .then((res) => {
            props.setupdateMemeList((update) => (update ? false : true));
            props.setShowMemeModal(false);
            clearMeme();
            toast.success("🦄 New meme added Successfully", {
              autoClose: 3000,
            });
          })
          .catch((err) =>
            toast.error("failed", {
              autoClose: 3000,
            })
          );
      } else {
        API.copyMeme(newMeme, props.meme.id)
          .then((res) => {
            props.setupdateMemeList((update) => (update ? false : true));
            props.setShowMemeModal(false);
            clearMeme();
            toast.success("🦄 Meme copied Successfully", {
              autoClose: 3000,
            });
          })
          .catch((err) =>
            toast.error("failed", {
              autoClose: 3000,
            })
          );
      }
    }
  };
  const handleClose = () => {
    clearMeme();
    console.log(selectedImage);
    props.handleClose();
  };
  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Meme Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            {props.mode === "newMeme" && (
              <ImageList
                images={props.images}
                setSelectedImage={setSelectedImage}
                setField={setField}
              ></ImageList>
            )}
            {(selectedImage || props.mode !== "newMeme") && (
              <span>image selected</span>
            )}
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
              defaultValue={props.meme ? props.meme.title : title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          {props.meme && props.meme.visibility === "protected" ? (
            <></>
          ) : (
            <Form.Group id="privateCheckbox">
              <Form.Check
                type="checkbox"
                label="Private"
                defaultChecked={!props.meme ? privateMeme : false}
                onChange={(e) => setPrivateMeme(e.target.checked)}
              />
            </Form.Group>
          )}

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

          {selectedImage &&
            props.mode === "newMeme" &&
            selectedImage.field.map((ImageField) => (
              <Form.Group key={ImageField.id}>
                <Form.Label>Position(x,y): {ImageField.pos}</Form.Label>
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
              </Form.Group>
            ))}
          {props.meme &&
            props.mode !== "newMeme" &&
            props.meme.field.map((memeField) => (
              <Form.Group key={memeField}>
                <Form.Label>Position(x,y): {memeField.pos}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  type="textArea"
                  name="text"
                  placeholder="text"
                  defaultValue={memeField.text}
                  onChange={(e) =>
                    setField((oldF) =>
                      oldF.map((fld) =>
                        fld.pos === memeField.pos
                          ? { text: e.target.value, pos: memeField.pos }
                          : fld
                      )
                    )
                  }
                />
              </Form.Group>
            ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          {props.mode !== "newMeme" ? "Copy" : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemeModal;
