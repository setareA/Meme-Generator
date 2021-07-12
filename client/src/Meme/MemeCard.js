import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Row, Col, Button, Card } from "react-bootstrap/";
import MemeModal from "../Meme/MemeModal";
import API from "../API";

const MemeCard = (props) => {
  const [copyMode, setCopymode] = useState();
  const [showMemeModal, setShowMemeModal] = useState(false);
  const [memeImage, setMemeImage] = useState();
  let history = useHistory();

  const handleCopy = () => {
    if (props.user.id === props.meme.userId) setCopymode("copyOwn");
    else setCopymode("copyOthers");
    // setMemeImage
    API.getImage(props.meme.imgAddr)
      .then((image) => {
        console.log("starting to copy");
        setMemeImage(image);
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

        <Card.Footer style={{ zIndex: "1" }}>
          <Row>
            <Col>
              <Button
                variant="outline-info"
                onClick={() => history.push(`/meme/${props.meme.id}`)}
              >
                View{" "}
              </Button>
            </Col>
            {props.loggedIn && (
              <Col>
                <Button variant="outline-primary" onClick={handleCopy}>
                  Copy
                </Button>
              </Col>
            )}
            {props.loggedIn && props.user.id === props.meme.userId && (
              <Col>
                <Button variant="outline-danger" onClick={handleDelete}>
                  Delete
                </Button>{" "}
              </Col>
            )}
          </Row>

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

export default MemeCard;
