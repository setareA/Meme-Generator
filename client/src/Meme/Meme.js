import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
import Footer from "../Common/Footer";

function Meme(props) {
  return (
    <div>
      meme
      <Footer></Footer>
    </div>
  );
}

export default withRouter(Meme);
