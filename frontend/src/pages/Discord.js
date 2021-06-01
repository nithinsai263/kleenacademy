import React from "react";

import "./Discord.css";
import discord from "./images/discord.png";

function Discord() {
  return (
    <div className="discord-parent-container">
      <div className="discord-title-container">
        <h2 className="discord-title-text1"> Discord </h2>
        <h2 className="discord-title-text2"> Link</h2>
      </div>
      <div className="Discord-image-container">
        <div
          className="Discord-image"
          style={{ backgroundImage: `url(${discord})` }}
        />
      </div>
      <div className="Discord-content-container">
        <p className="Discord-content-text">
          Lorem ipsum dolor sit amet, consectetuer adipiscing eli consectetuer
          adipiscing eli consectetuer adipiscing eli Lorem ipsum dolor sit amet,
          adipiscing eli conse. Lorem ipsum dolor sit amet, consectetuer
          adipiscing eli Lorem ipsum dolor sit amet, consectetuer adipiscing eli
          consectetuer adipiscing eli consectetuer adipiscing eli Lorem ipsum
          dolor sit amet, adipiscing eli conse. Lorem ipsum dolor sit amet,{" "}
        </p>
      </div>
      <div className="Discord-button-wrapper">
        <button className="Discord-Join_now">Join Discord</button>
      </div>
    </div>
  );
}

export default Discord;
