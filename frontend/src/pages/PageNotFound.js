import React from "react";
import Page from "./images/404.png";
function PageNotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        border: "1px solid green",
        backgroundColor: "#000",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${Page})`,
          backgroundSize: "contain",
          height: "100%",
          width: "100%",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

export default PageNotFound;
