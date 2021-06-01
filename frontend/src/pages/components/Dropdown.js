import React, { useState } from "react";

import "./Dropdown.css";
import { Link } from "react-router-dom";
import { logout } from "../../graphql/gql";
import { useMutation } from "@apollo/react-hooks";
import {
  FaAssistiveListeningSystems,
  FaBolt,
  FaBook,
  FaCog,
  FaNetworkWired,
} from "react-icons/fa";

const MenuItems = [
  {
    id: "dropdown-courses",
    title: "My Courses",
    path: "/mycourses",
    cName: "dropdown-link",
  },
  {
    id: "dropdown-paths",
    title: "My Paths",
    path: "/mypaths",
    cName: "dropdown-link",
  },
  {
    id: "dropdown-settings",
    title: "Settings",
    path: "/profilesettings",
    cName: "dropdown-link",
  },
  {
    id: "dropdown-logout",
    title: "Logout",
    path: "/",
    cName: "dropdown-link",
  },
];

function Dropdown() {
  const [userlogout] = useMutation(logout);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const logoutuser = (id) => {
    if (id === "dropdown-logout") {
      try {
        const res = userlogout();
        if (res) alert("looged out");
      } catch (err) {
        alert("issh");
      }
    }
  };
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-list clicked" : "dropdown-list"}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index} className="dropdown-list-li-container">
              {item.id === "dropdown-courses" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "8px",
                  }}
                >
                  <FaBook size={12} />
                </div>
              )}
              {item.id === "dropdown-paths" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "8px",
                  }}
                >
                  <FaNetworkWired size={12} />
                </div>
              )}
              {item.id === "dropdown-settings" && (
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
              {item.id === "dropdown-settings" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "8px",
                  }}
                ></div>
              )}
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => {
                  setClick(false);
                  logoutuser(item.id);
                }}
              >
                <p className="dropdown-li-items">{item.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
