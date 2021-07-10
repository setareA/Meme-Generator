import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
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
// oggedIn={loggedIn} meme={meme}
const MemeCard = (props) => {
  return (
    <Col md={4}>
      <Card className="card_item">
        <Card.Img variant="top" src={props.meme.imgAddr} />
        <Card.Body>
          <Card.Title>{props.meme.title}</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
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
visibility: "public"*/
export default MemeCard;
