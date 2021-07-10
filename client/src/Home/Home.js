import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Common/Footer";
import { withRouter } from "react-router-dom";

function Home(props) {
  return (
    <div>
      home <img src="/image.png" alt="tt" />
      <Footer></Footer>
    </div>
  );
}

export default withRouter(Home);
