import React from "react";
import "./DifficultyTag.css";

function DifficultyTag({ tag }) {
  return (
    <div className="DifficultyTag-parent-container">
      {tag === "easy" && (
        <div className="DifficultyTag-easy">
          <p>Easy</p>
        </div>
      )}
      {tag === "medium" && (
        <div className="DifficultyTag-medium">
          <p>Medium</p>
        </div>
      )}
      {tag === "hard" && (
        <div className="DifficultyTag-hard">
          <p>Hard</p>
        </div>
      )}
    </div>
  );
}

export default DifficultyTag;
