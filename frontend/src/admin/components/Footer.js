import React from "react";

function Footer() {
  return (
    <div
      style={{
        width: "99%",
        backgroundColor: "#ebedef",
        borderTopColor: "#c0c0c0",
        borderTopWidth: "1px",
        borderTopStyle: "dotted",
        height: "6vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 5px",
        fontFamily: "sans-serif",
        fontSize: "13px",
      }}
    >
      <p>Kleen Security @2021</p>
      <p>
        Powered by<span style={{ color: "purple" }}> Kleen Security</span>
      </p>
    </div>
  );
}

export default Footer;
