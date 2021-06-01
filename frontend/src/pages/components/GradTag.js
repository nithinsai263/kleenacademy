import React from "react";
import Gradeasy from "../images/gradeasy.png";
import Gradmedium from "../images/gradmedium.png";
import Gradhard from "../images/gradhard.png";
import "./GradTag.css";
function GradTag({ tag, opacity }) {
  return (
    <>
      {tag === "easy" && (
        <div
          className="gradtag-generic"
          style={{
            opacity: `${opacity}`,
            backgroundImage: `url(${Gradeasy})`,
          }}
        />
      )}
      {tag === "medium" && (
        <div
          className="gradtag-generic"
          style={{
            opacity: `${opacity}`,
            backgroundImage: `url(${Gradmedium})`,
          }}
        />
      )}
      {tag === "hard" && (
        <div
          className="gradtag-generic"
          style={{
            opacity: `${opacity}`,
            backgroundImage: `url(${Gradhard})`,
          }}
        />
      )}
    </>
  );
}

export default GradTag;
