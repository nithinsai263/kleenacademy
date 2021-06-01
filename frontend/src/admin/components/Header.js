import React, { useState } from "react";
import { FaBars, FaBell, FaSortDown, FaUser } from "react-icons/fa";
import Dropdown from "./Dropdown";

function Header() {
  const [drop, setDrop] = useState(false);
  const dropdownenable = () => {
    setDrop(!drop);
  };
  return (
    <div
      style={{
        width: "80vw",
        backgroundColor: "white",
        height: "8vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ cursor: "pointer", paddingLeft: "20px" }}>
        <FaBars size={25} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingRight: "20px",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <div style={{ paddingRight: "30px" }}>
          <FaBell size={20} />
        </div>
        <div
          onClick={dropdownenable}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <div
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              backgroundColor: "blue",
            }}
          />
          <FaSortDown />
          {drop && <Dropdown />}
        </div>
      </div>
    </div>
  );
}

export default Header;
