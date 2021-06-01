import React from "react";
import "./CompletedCourseCard.css";
import DifficultyTag from "./DifficultyTag";

import Gradeasy from "../images/gradeasy.png";
import Gradmedium from "../images/gradmedium.png";
import Gradhard from "../images/gradhard.png";
import coursephoto from "../images/path.png";
function CompletedCourseCard({ image, title1, title2, tag, content }) {
  return (
    <div className="completedCourseCard-parent-container">
      <div className="completedCourseCard-responsive-wrapper">
        <div
          className="completedCourseCard-image-container"
          style={{ backgroundImage: `url(${coursephoto})` }}
        />
      </div>
      <div className="completedCourseCard-content-container">
        <div className="completedCourseCard-heading-wrapper">
          <h1 className="completedCourseCard-heading1">{title1}</h1>
          <h1 className="completedCourseCard-heading2">{title2}</h1>
        </div>

        <DifficultyTag tag={tag} />
        <div className="completedCourseCard-content">
          <p>{content}</p>
        </div>
        <div className="completedCourseCard-bottom-container">
          {tag === "easy" && (
            <div
              className="completedCourseCard-grad-image"
              style={{ backgroundImage: `url(${Gradeasy})` }}
            />
          )}
          {tag === "medium" && (
            <div
              className="completedCourseCard-grad-image"
              style={{ backgroundImage: `url(${Gradmedium})` }}
            />
          )}
          {tag === "hard" && (
            <div
              className="completedCourseCard-grad-image"
              style={{ backgroundImage: `url(${Gradhard})` }}
            />
          )}

          <button className="completedCourseCard-leave-review-button">
            Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompletedCourseCard;
