import React from "react";
import boost from "../images/boost.png";
import "./BuyBoultsCard.css";

function BuyBoultsCard({ bolts, price }) {
  return (
    <div className="buyboultscard-parent-container">
      <div className="buyboults-hover-container">
        <div className="buyboultscard-number-boults">
          <h4 className="buyboultscard-title-text">+{bolts}</h4>
          <div
            className="buyboultscard-boost-image"
            style={{ backgroundImage: `url(${boost})` }}
          />
        </div>

        <div>
          <p className="buyboultscard-price-text">For Rs {price}</p>
        </div>
      </div>
    </div>
  );
}

export default BuyBoultsCard;
