import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
import { useHistory } from "react-router-dom";
import { Image } from "react-bootstrap";
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
        <Card.Body>
          <Card.Img
            src={props.meme.imgAddr}
            className="img-fluid"
            alt="Card image"
            style={{ height: "300px", width: "100%" }}
          />
          <Card.ImgOverlay>
            <Card.Subtitle style={{ textAlign: "right", fontSize: "30px" }}>
              ttt
            </Card.Subtitle>
            <Card.Subtitle> date </Card.Subtitle>
            <Image fluid={props.meme.imgAddr} />
          </Card.ImgOverlay>
        </Card.Body>
        <Card.Footer style={{ zIndex: "1" }}>
          {props.loggedIn && (
            <Button variant="primary" onClick={handleCopy}>
              Copy
            </Button>
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
