import React, { useState } from "react";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import PathCardExtension from "./PathCardExtension";
import "./CompletedPathCard.css";
import courseimage from "../images/course.png";

function CompletedPathCards({
  title1,
  title2,
  image,
  content,
  percent,
  completedcourses,
}) {
  const [modulesexpand, Setmodulesexpand] = useState(false);
  return (
    <div className="completedPathCard-parent-container">
      <div>
        <div className="completedPathCard-title-row">
          <div className="completedPathCard-title-image-wrapper">
            <div
              className="completedPathCard-title-image"
              style={{ backgroundImage: `url(${courseimage})` }}
            />
            <div className="completedPathCard-heading-wrapper">
              <h1 className="completedPathCard-title1-text">{title1}</h1>
              <h1 className="completedPathCard-title2-text">{title2}</h1>
            </div>
          </div>
          <div className="completedPathCard-continue-button-container">
            {percent != 100 ? (
              <button
                className="completedPathCard-continue-button"
                onClick={() => Setmodulesexpand(!modulesexpand)}
              >
                Continue
              </button>
            ) : (
              <button className="completedPathCard-continue-button">
                Review
              </button>
            )}
          </div>
        </div>
        <div className="completedPathCard-content-wrapper">
          <p>{content}</p>
        </div>
        <MediaQuery minWidth={950}>
          <ProgressBar width={400} percent={percent} />
        </MediaQuery>
        <MediaQuery maxWidth={950}>
          <ProgressBar width={200} percent={percent} />
        </MediaQuery>
        <h4 className="completedPathCard-percent-label">
          {percent}% Completed
        </h4>
        <button
          className="completedPathCard-modules-button"
          onClick={() => Setmodulesexpand(!modulesexpand)}
        >
          {completedcourses.length} Modules
        </button>
        {modulesexpand ? (
          <div style={{ paddingTop: "10px" }}>
            <PathCardExtension courses={completedcourses} />
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default CompletedPathCards;
