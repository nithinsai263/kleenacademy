import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSortDown, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import Dropdown from "./Dropdown";
import "./AcademyNavbar.css";
import { useHistory } from "react-router-dom";
import { userid, profilesettingsuser, logout } from "../../graphql/gql";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";

import logo from "../images/mainlogo.png";

function AcademyNavbar({ authenticated }) {
  const [click, setClick] = useState(false);
  const { data: userid_data } = useQuery(userid);
  const [userlogout] = useMutation(logout);
  const [profileuser, { data: profileuser_data }] = useLazyQuery(
    profilesettingsuser
  );

  useEffect(() => {
    if (userid_data) {
      profileuser({
        variables: { id: String(userid_data.me) },
      });
    }
  }, [userid_data]);
  const handleClick = () => {
    setClick(!click);
  };
  const closeMobileMenu = () => {
    setClick(false);
  };
  const logoutsession = () => {
    const res = userlogout();
    if (res) alert("looged out");
  };

  const [dropdown, setDropdown] = useState(false);
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="navbar-container container">
            <Link
              to={authenticated ? "/dashboard" : "/"}
              offset={0}
              spy={true}
              smooth={true}
              duration={500}
              className="navbar-logo"
              onClick={closeMobileMenu}
            >
              <img style={{ height: 40 }} src={logo} />
            </Link>
            {authenticated ? (
              <div className="nav-bar-search">
                <input
                  type="text"
                  placeholder="Search any course or path here"
                />
              </div>
            ) : (
              <div />
            )}
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            {authenticated ? (
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li
                  className="nav-items"
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <Link
                    to=""
                    className="nav-links"
                    activeClass="active"
                    onClick={closeMobileMenu}
                  >
                    <div>
                      {click ? (
                        <ul className={"nav-menu active"}>
                          <li className="nav-items">
                            <Link
                              to="/mycourses"
                              className="nav-links"
                              activeClass="active"
                              spy={true}
                              smooth={true}
                              duration={500}
                              onClick={closeMobileMenu}
                            >
                              My Courses
                            </Link>
                          </li>
                          <li className="nav-items">
                            <Link
                              to="/mypaths"
                              className="nav-links"
                              activeClass="active"
                              spy={true}
                              smooth={true}
                              duration={500}
                              onClick={closeMobileMenu}
                            >
                              My Paths
                            </Link>
                          </li>
                          <li className="nav-items">
                            <Link
                              to="/profilesettings"
                              className="nav-links"
                              activeClass="active"
                              spy={true}
                              smooth={true}
                              duration={500}
                              onClick={closeMobileMenu}
                            >
                              Settings
                            </Link>
                          </li>
                          <li className="nav-items">
                            <Link
                              to="/login"
                              className="nav-links"
                              activeClass="active"
                              spy={true}
                              smooth={true}
                              duration={500}
                              onClick={() => {
                                closeMobileMenu();
                                logoutsession();
                              }}
                            >
                              Logout
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "contain",
                              border: "1px solid gray",
                              backgroundImage: profileuser_data
                                ? `url(
                               ${profileuser_data.userdata.profileimageurl})`
                                : `url(
                                https://lh3.googleusercontent.com/MOf9Kxxkj7GvyZlTZOnUzuYv0JAweEhlxJX6gslQvbvlhLK5_bSTK6duxY2xfbBsj43H=w300)`,
                            }}
                          />
                          <FaSortDown color="gray" />
                        </div>
                      )}
                    </div>
                  </Link>
                  {dropdown && <Dropdown />}
                </li>
              </ul>
            ) : (
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-items">
                  <Link
                    to="/login"
                    className="nav-links"
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    duration={500}
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-items">
                  <Link
                    to="/joinnow"
                    className="nav-links"
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    duration={500}
                    onClick={closeMobileMenu}
                  >
                    <button className="navbar-signup">Signup</button>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default AcademyNavbar;
