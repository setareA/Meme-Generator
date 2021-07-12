import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
import { useHistory } from "react-router-dom";
import { Image } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Button,
  CardGroup,
  Card,
  CardColumns,
  CardDeck,
} from "react-bootstrap/";
import MemeModal from "../Meme/MemeModal";
import { viewIcon } from "../Common/icons";
import API from "../API";
// oggedIn={loggedIn} meme={meme} user={user} setupdateMemeList={setupdateMemeList}
const MemeCard = (props) => {
  const [copyMode, setCopymode] = useState();
  const [showMemeModal, setShowMemeModal] = useState(false);
  const [memeImage, setMemeImage] = useState();
  let history = useHistory();
  const handleClickOnmeme = () => {
    history.push("/meme/3");
  };
  const handleCopy = () => {
    if (props.user.id === props.meme.userId) setCopymode("copyOwn");
    else setCopymode("copyOthers");
    // setMemeImage
    API.getImage(props.meme.imgAddr)
      .then((image) => {
        console.log("starting to copy");
        setMemeImage(image);
        //    console.log([memeImage][0]);
        setShowMemeModal(true);
      })
      .catch((err) => {});
  };

  const handleDelete = () => {
    API.deleteMeme(props.meme.id)
      .then(() => {
        toast.success("🦄 Meme Deleted Successfully", {
          autoClose: 3000,
        });
        props.setupdateMemeList((update) => (update ? false : true));
      })
      .catch((err) =>
        toast.error("Delete Failed", {
          autoClose: 3000,
        })
      );
  };

  const handleCloseMemeModal = () => {
    setShowMemeModal(false);
  };

  return (
    <Col md={3}>
      <Card className="card_item">
        <Card.Header>
          {" "}
          <Card.Title>{props.meme.title}</Card.Title>
        </Card.Header>

        <Card.Img
          src={props.meme.imgAddr}
          className="img-fluid"
          alt="Card image"
          style={{ height: "300px", width: "100%" }}
        />
        <Card.ImgOverlay className="position-relative">
          {props.meme.field &&
            props.meme.field.map((fld) => (
              <Card.Subtitle
                style={{
                  position: "absolute",
                  left: `${fld.pos.split(" ")[0]}px`,
                  bottom: `${fld.pos.split(" ")[1]}px`,
                  marginBottom: "40px",
                  fontSize: "1.5em",
                  fontFamily: `${props.meme.font}`,
                  color: `${props.meme.color}`,
                }}
              >
                {fld.text}
              </Card.Subtitle>
            ))}
        </Card.ImgOverlay>

        <Card.Footer style={{ zIndex: "1" }}>
          {props.loggedIn && (
            <Row>
              <Col>
                <Button
                  variant="outline-info"
                  onClick={() => history.push(`/meme/${props.meme.id}`)}
                >
                  View{" "}
                </Button>
              </Col>
              <Col>
                <Button variant="outline-primary" onClick={handleCopy}>
                  Copy
                </Button>
              </Col>
              {props.user.id === props.meme.userId && (
                <Col>
                  <Button variant="outline-danger" onClick={handleDelete}>
                    Delete
                  </Button>{" "}
                </Col>
              )}
            </Row>
          )}
          <MemeModal
            show={showMemeModal}
            setShowMemeModal={setShowMemeModal}
            images={[memeImage]}
            handleClose={handleCloseMemeModal}
            setupdateMemeList={props.setupdateMemeList}
            mode={copyMode}
            meme={props.meme}
          ></MemeModal>
        </Card.Footer>
      </Card>
    </Col>
  );
};

/*field: Array(2)
0: {text: "kolahghermezi", pos: "top"}
1: {text: "huuuu", pos: "toptop"}
length: 2
__proto__: Array(0)
id: 110
imgAddr: "famildur/image/"
num_of_fields: 2
title: "babaei"
userId: 1
userName: "first_user"
userRealName: "setare"
visibility: "public"

      
   {" "}
     */
export default MemeCard;
