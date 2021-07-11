import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { withRouter } from "react-router-dom";
import MemeCard from "../Meme/MemeCard";
import MemeModal from "../Meme/MemeModal";
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
import { useEffect, useState } from "react";
import API from "../API";

function Home(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [memes, setMemes] = useState([]);
  const [images, setImages] = useState([]);
  const [updateMemeList, setupdateMemeList] = useState(false);
  const [showMemeModal, setShowMemeModal] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        await API.getUserInfo().then((user) => {
          console.log(user);
          setUser(user);
          setLoggedIn(true);
          API.getAllMemes().then((memes) => {
            //console.log(memes);
            setMemes(memes);
          });
        });
      } catch (err) {
        setLoggedIn(false);
        API.getPublicMemes().then((memes) => {
          console.log(memes);
          setMemes(memes);
        });
        console.error(err);
      }
    };
    checkAuth();
  }, [updateMemeList]);
  /*
  useEffect(() => {
    if (!loggedIn) {
      console.log("in use effectttttttttttt");

      API.getPublicMemes().then((memes) => {
        console.log(memes);
        setMemes(memes);
      });
    }
  }, [updateList, loggedIn]);
  */
  const handleAddNewMeme = () => {
    API.getAllImages().then((images) => {
      console.log(images);
      setImages(images);
      setShowMemeModal(true);
    });
  };
  const handleCloseMemeModal = () => {
    setShowMemeModal(false);
  };
  return (
    <Container fluid className="page-container">
      <Row>
        <Header loggedIn={loggedIn} user={user} />
      </Row>
      <Row id="content-wrap">
        {memes.map((meme) => (
          <MemeCard loggedIn={loggedIn} meme={meme} />
        ))}
      </Row>
      {loggedIn && (
        <Row>
          <MemeModal
            show={showMemeModal}
            images={images}
            handleClose={handleCloseMemeModal}
            setupdateMemeList={setupdateMemeList}
          ></MemeModal>
          <Button
            className="btn btn-lg fixed-right-bottom"
            onClick={handleAddNewMeme}
          >
            &#43;
          </Button>
        </Row>
      )}
      <Row>
        <Footer></Footer>
      </Row>
    </Container>
  );
}

export default withRouter(Home);
