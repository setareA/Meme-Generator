import React from "react";
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
import { viewIcon } from "../Common/icons";
// oggedIn={loggedIn} meme={meme}
const MemeCard = (props) => {
  let history = useHistory();
  const handleClickOnmeme = () => {
    history.push("/meme/3");
  };
  return (
    <Col md={4}>
      <Card className="card_item">
        <Card.Img
          src={props.meme.imgAddr}
          className="img-fluid"
          alt="Card image"
          style={{ height: "300px", width: "100%" }}
        />
        <Card.ImgOverlay>
          <Card.Title> {props.meme.title} </Card.Title>
          <Card.Subtitle> subtitle </Card.Subtitle>
          <Card.Subtitle style={{ textAlign: "right", fontSize: "30px" }}>
            {" "}
            path{" "}
          </Card.Subtitle>
          <Card.Subtitle> date </Card.Subtitle>
          <Image fluid={props.meme.imgAddr} />
        </Card.ImgOverlay>
        <Card.Body
          onClick={() => {
            history.push("/meme/v");
          }}
        >
          <Card.Title>{props.meme.title}</Card.Title>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        {props.loggedIn && (
          <Card.Footer>
            <span
              onClick={() => {
                history.push("/meme/view");
              }}
            >
              {viewIcon}
            </span>
          </Card.Footer>
        )}
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
visibility: "public"*/
export default MemeCard;
