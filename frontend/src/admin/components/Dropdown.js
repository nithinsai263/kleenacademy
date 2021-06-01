import React, { useState } from "react";

import "./Dropdown.css";
import { Link } from "react-router-dom";
import { FaUser, FaCog } from "react-icons/fa";

const MenuItems = [
  {
    id: "admin-profile",
    title: "Profile",
    path: "/mycourses",
    cName: "dropdown-link",
  },

  {
    id: "admin-settings",
    title: "Settings",
    path: "/profilesettings",
    cName: "dropdown-link",
  },
  {
    id: "admin-logout",
    title: "Logout",
    path: "/",
    cName: "dropdown-link",
  },
];

function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index} className="admin-list-li-container">
              {item.id === "admin-profile" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "8px",
                  }}
                >
                  <FaUser size={12} />
                </div>
              )}
              {item.id === "admin-settings" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "8px",
                  }}
                >
                  <FaCog size={12} />
                </div>
              )}
              <p className="dropdown-li-items">{item.title}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
