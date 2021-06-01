import React from "react";
import "./CommingSoon.css";
import underconstruction from "./images/underconstruction.png";
function CommingSoon() {
  return (
    <div className="comming-soon-parent-container">
      <div className="comming-soon-title-container">
        <h1 className="comming-soon-title1">Under</h1>
        <h1 className="comming-soon-title2">Construction</h1>
        <div className="comming-soon-site-nearly-ready">
          <h4 className="comming-soon-site-nearly-ready-text">
            Site nearly ready
          </h4>
        </div>
        <div>
          <div className="comming-soon-loading-container">
            <div className="comming-soon-loading-container-fill"> </div>
          </div>
          <div className="comming-soon-loading-container-label">
            <h3 className="comming-soon-loading-container-label-text">0%</h3>
            <h3 className="comming-soon-loading-container-label-text">100%</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommingSoon;
