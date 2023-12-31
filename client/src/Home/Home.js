import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { withRouter } from "react-router-dom";
import MemeCard from "../Meme/MemeCard";
import MemeModal from "../Meme/MemeModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Container, Row, Button } from "react-bootstrap/";
import { useEffect, useState } from "react";
import API from "../API";

function Home(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [memes, setMemes] = useState([]);
  const [images, setImages] = useState();
  const [updateMemeList, setupdateMemeList] = useState(false);
  const [showMemeModal, setShowMemeModal] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.getUserInfo().then((user) => {
          console.log(user);
          setUser(user);
          setLoggedIn(true);
          API.getAllMemes().then((memes) => {
            setMemes(memes);
          });
        });
      } catch (err) {
        setLoggedIn(false);
        API.getPublicMemes().then((memes) => {
          setMemes(memes);
        });
        console.error(err);
      }
    };
    checkAuth();
  }, [updateMemeList]);

  const handleAddNewMeme = () => {
    API.getAllImages().then((images) => {
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
          <MemeCard
            key={meme.id}
            loggedIn={loggedIn}
            meme={meme}
            user={user}
            setupdateMemeList={setupdateMemeList}
          />
        ))}
      </Row>
      {loggedIn && (
        <Row>
          <MemeModal
            show={showMemeModal}
            setShowMemeModal={setShowMemeModal}
            images={images}
            handleClose={handleCloseMemeModal}
            setupdateMemeList={setupdateMemeList}
            mode="newMeme"
            meme={{}}
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
      <ToastContainer />
    </Container>
  );
}

export default withRouter(Home);
