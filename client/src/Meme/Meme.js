import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap/";
import API from "../API";
import { useEffect, useState } from "react";
import { protectedIcon, publicIcon } from "../Common/icons";

function Meme(props) {
  const [meme, setMeme] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMeme = async () => {
      console.log("in use effectttttttttttt");
      API.getMeme(props.match.params.id).then((meme) => {
        console.log(meme);
        setMeme(meme);
      });
    };
    getMeme();
  }, [props.match.params.id]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.getUserInfo().then((u) => {
          console.log(u);
          setUser(u);
          setLoggedIn(true);
        });
      } catch (err) {
        setLoggedIn(false);
        console.error(err);
      }
    };
    checkAuth();
  }, []);

  return (
    <Container fluid className="page-container">
      <Row>
        <Header loggedIn={loggedIn} user={user} />
      </Row>
      <Row id="content-wrap">
        {meme && (
          <>
            <Col>
              <figure className="position-relative" style={{ width: "600px" }}>
                <Image
                  src={"../" + meme.imgAddr}
                  alt="meme image"
                  className="img-fluid"
                />
                {meme.field &&
                  meme.field.map((fld) => (
                    <figcaption
                      key={fld}
                      style={{
                        position: "absolute",
                        left: `${fld.pos.split(" ")[0]}px`,
                        bottom: `${fld.pos.split(" ")[1]}px`,
                        fontSize: "1.5em",
                        fontFamily: `${meme.font}`,
                        color: `${meme.color}`,
                      }}
                    >
                      {fld.text}
                    </figcaption>
                  ))}
              </figure>
            </Col>
            <Col>
              {" "}
              <Card
                bg="info"
                style={{ width: "400px", marginLeft: "70px" }}
                className="mb-2"
              >
                <Card.Header>
                  <Card.Title>{meme.title} </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>Created By: {meme.userRealName}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  {meme.visibility === "protected" ? (
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip-2">Protected Meme</Tooltip>
                      }
                    >
                      <span>{protectedIcon}</span>
                    </OverlayTrigger>
                  ) : (
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip-2">Public Meme</Tooltip>
                      }
                    >
                      <span>{publicIcon}</span>
                    </OverlayTrigger>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          </>
        )}
      </Row>
      <Row>
        <Footer></Footer>
      </Row>
    </Container>
  );
}

export default withRouter(Meme);
