import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/style.css";

function Footer(props) {
  return (
    <div className="row">
      <div className="footer">
        <div className="container">
          <div className="col-sm-12">
            <p>Copyright © 2021 MemeGenerator. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
