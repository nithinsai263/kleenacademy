import React from "react";
import "./Card1.css";
import { FaNetworkWired, FaThumbsUp, FaUser, FaVideo } from "react-icons/fa";
function Card1({ Icon, title, Number }) {
  return (
    <div className="dashboard-tile1">
      <div>
        <div>
          {Icon === "user" && <FaUser size={35} color="#10b7ff" />}
          {Icon === "video" && <FaVideo size={35} color="#a3a110" />}
          {Icon === "paths" && <FaNetworkWired size={35} color="#a64b3b" />}
          {Icon === "likes" && <FaThumbsUp size={35} color="#519126" />}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "5px",
          }}
        >
          <h5 style={{ color: "#777", marginRight: "20px", fontSize: "12px" }}>
            {title}
          </h5>
          <h4>{Number}</h4>
        </div>
      </div>
    </div>
  );
}

export default Card1;
