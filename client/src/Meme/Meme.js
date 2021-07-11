import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { Container, Row, Col, Button, Image } from "react-bootstrap/";
import API from "../API";
import MemeCard from "../Meme/MemeCard";
import { useEffect, useState } from "react";

function Meme(props) {
  const [meme, setMeme] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log("in use effectttttttttttt");
    API.getMeme(props.match.params.id).then((meme) => {
      console.log(meme);
      setMeme(meme);
    });
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
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
                <figcaption
                  style={{
                    position: "absolute",
                    left: "0px",
                    bottom: "0px",
                    fontSize: "1.5em",
                    fontFamily: "Cursive",
                    color: "white",
                  }}
                >
                  text sjdkdjfkasjdfakjsdf
                </figcaption>
              </figure>
            </Col>
            <Col> info</Col>
          </>
        )}
      </Row>
      <Row>
        <Footer></Footer>
      </Row>
    </Container>
  );
}
/*
id: e.memeId,
    imgAddr: e.imageName,
    visibility: e.visibility,
    userId: e.userId,
    userName: e.username,
    userRealName: e.name,
    title: e.title,
    num_of_fields: e.numOfSentences,
    text: e.text,
    position: e.position,
    field: [*/

export default withRouter(Meme);
