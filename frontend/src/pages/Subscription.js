import React from "react";
import "./Subscription.css";
import SubscriptionCard from "./components/SubscriptionCard";
import merch1 from "./images/tshirt1.png";
import merch2 from "./images/cap.png";
import merch3 from "./images/tshirt2.png";

function Subscription() {
  return (
    <div className="subscription-parent-container">
      <div className="subscription-title-wrapper">
        <p className="merch-titlecontainer">Merchandise</p>
        <p className="merch-titlecontainer2">Soon</p>
      </div>
      <div className="merch-maincontainer">
        <img src={merch1} className="merch-imagecontainer" />
        <img src={merch2} className="merch-imagecontainer-cap" />
        <img src={merch3} className="merch-imagecontainer" />
      </div>
    </div>
  );
}

export default Subscription;
