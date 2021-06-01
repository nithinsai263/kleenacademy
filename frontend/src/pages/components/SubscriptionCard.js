import React from "react";
import "./SubscriptionCard.css";
import freesubscription from "../images/freesubscription.png";
import vipsubscription from "../images/vipsubscription.png";
import boost from "../images/boost.png";

const features = [
  { content: "*  All the  featurese in free tier " },
  { content: "*  All the  featurese in free tier " },
  { content: "*  All the  featurese in free tier " },
];
function SubscriptionCard({ flag }) {
  return (
    <div
      className="subscription-card-container"
      style={{
        backgroundImage: flag
          ? `url(${freesubscription})`
          : `url(${vipsubscription})`,
      }}
    >
      <div className="subscription-card-free-title">
        <p className="subscription-card-free-title-text">
          Get started with cyber security
        </p>
      </div>
      <div className="subscription-card-flashes-container">
        <div>
          <div className="subscription-card-flashes-wrapper">
            <h3 className="subscription-card-flashes-title">+50</h3>
            <div
              className="subscription-card-boost-image"
              style={{ backgroundImage: `url(${boost})` }}
            />
          </div>
          <p className="subscription-card-flashes-subtitle">each month</p>
        </div>
      </div>
      <div className="subscription-card-price-container">
        <h1 className="subscription-card-price-text1">Rs 10/</h1>
        <h3 className="subscription-card-price-text2">month</h3>
      </div>
      <div className="subscription-card-features">
        <div>
          <p className="subscription-card-features-title">
            You will be able to unlock
          </p>
          {features.map((feature) => (
            <p className="subscription-card-feature-content">
              {feature.content}
            </p>
          ))}
        </div>
      </div>
      <div className="subscription-card-subscribe-wrapper">
        <button className="subscription-card-subscribe-button">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default SubscriptionCard;
