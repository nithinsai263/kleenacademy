import React from "react";
import "./Smallfooter.css";
import logo from "../images/logo.png";

function Smallfooter() {
  return (
    <div className="smallfooter-container">
      <div>
        <p style={{ paddingLeft: "10px" }}>
          2021 © Kleen-Security · Terms of Service · Privacy Policy · Acceptable
          Use Policy · FAQ
        </p>
      </div>
      <div className="smallfooter-subcontainer-logo ">
        <p className="smallfooter-text">Powered by</p>
        <img style={{ height: 25 }} className="smallfooter-logo" src={logo} />
      </div>
    </div>
  );
}

export default Smallfooter;
