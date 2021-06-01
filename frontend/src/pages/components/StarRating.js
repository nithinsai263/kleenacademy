import React, { useState } from "react";
import Star from "../images/vectoricons/star";
function StarRating({ active, nonactive }) {
  const iterator1 = Math.floor(active);
  const iterator2 = Math.floor(nonactive);
  let temp = [];
  let temp2 = [];

  for (let i = 0; i < iterator1; i++) {
    temp.push(<Star color="#ff4d15" />);
  }
  for (let i = 0; i < iterator2; i++) {
    temp2.push(<Star color="white" />);
  }

  return (
    <div style={{ display: "flex" }}>
      {temp}
      {temp2}
    </div>
  );
}

export default StarRating;
