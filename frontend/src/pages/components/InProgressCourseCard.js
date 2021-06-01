import React from "react";
import DifficultyTag from "./DifficultyTag";
import ProgressBar from "./ProgressBar";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import "./InProgressCourseCard.css";
import coursephoto from "../images/path.png";

function InprogressCourse({ image, title1, title2, tag, content, percent }) {
  return (
    <div className="inProgressCourseCard-parent-container">
      <div className="inProgressCourseCard-responsive-wrapper">
        <div
          className="inProgressCourseCard-image-container"
          style={{ backgroundImage: `url(${coursephoto})` }}
        />
      </div>
      <div className="inProgressCourseCard-content-container">
        <div className="inProgressCourseCard-heading-wrapper">
          <h1 className="inProgressCourseCard-heading1">{title1}</h1>
          <h1 className="inProgressCourseCard-heading2">{title2}</h1>
        </div>
        <DifficultyTag tag={tag} />
        <div className="inProgressCourseCard-content">
          <p>{content}</p>
        </div>
        <div className="inProgressCourseCard-bottom-container">
          <MediaQuery minWidth={950}>
            <ProgressBar width={400} percent={percent} />
          </MediaQuery>
          <MediaQuery maxWidth={950}>
            <ProgressBar width={200} percent={percent} />
          </MediaQuery>
          <Link to="/videocourses" style={{ textDecoration: "none" }}>
            <button className="inProgressCourseCard-continue-button">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InprogressCourse;
