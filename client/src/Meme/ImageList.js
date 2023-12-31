import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Dropdown, DropdownButton } from "react-bootstrap/";

const ImageList = (props) => {
  const handleSelectImage = (image) => {
    props.setSelectedImage(image);
    props.setField(image.field.map((f) => ({ text: "", pos: f.pos })));
    console.log(image.field.map((f) => ({ text: "", pos: f.pos })));
  };
  return (
    <DropdownButton id="dropdown-basic-button" title="Select Image">
      {props.images.map((image) => (
        <Dropdown.Item key={image.id} onClick={() => handleSelectImage(image)}>
          <Image src={image.imgAddr} alt="meme image" className="img-fluid" />
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default ImageList;
