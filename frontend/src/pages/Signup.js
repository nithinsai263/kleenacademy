import React, { Component } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import GoogleLogin from "react-google-login";

import "./Signup.css";
import AcademyNavbar from "./components/AcademyNavbar";
import Smallfooter from "./components/Smallfooter";
import Particlejsloginsignup from "./components/Particlejsloginsignup";
import { createUser, googlesignup } from "../graphql/gql";
import { setAccessToken } from "../accessToke";

export default function Signup({ history }) {
  const [usersignup] = useMutation(createUser);
  const [usergooglesignup] = useMutation(googlesignup);
  const responseGoogle = async (response) => {
    const res = await usergooglesignup({
      variables: {
        email: response.profileObj.email,
        name: response.profileObj.name,
        googleId: response.profileObj.googleId,
      },
    });
    if (res) {
      console.log(res.data);
      setAccessToken(res.data.googlesignup.accessToken);
      history.push("/dashboard");
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(JSON.stringify(values.name));

      const res = await usersignup({
        variables: {
          email: values.email,
          password: values.password,
          name: values.name,
          username: values.username,
        },
      });

      if (res) {
        history.push("/login");
      }
    },
  });

  return (
    <>
      <AcademyNavbar />

      <div className="signup-section" id="contact">
        <div className="signup-container-1">
          <div className="login-content-wrapper">
            <form onSubmit={formik.handleSubmit}>
              <div className="login-email-wrapper">
                <div className="login-label-container">Name</div>{" "}
                <input
                  id="abcdefg"
                  type="name"
                  name="name"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>

              <div className="login-email-wrapper">
                <div className="login-label-container">Email</div>{" "}
                <input
                  id="abcdefg"
                  type="email"
                  name="email"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className="login-password-wrapper">
                <div className="login-label-container">Password</div>
                <input
                  id="abcdefg"
                  type="password"
                  name="password"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div>
                <div className="login-signup-link">
                  <input type="checkbox" className="login-checkbox" />
                  <p>
                    I agree to the{" "}
                    <span style={{ color: "#ff4d15" }}>
                      terms and conditions
                    </span>
                  </p>
                </div>

                <input
                  type="submit"
                  name="Signup"
                  value="Signup"
                  id="loginbutton"
                />
              </div>
            </form>
            <div
              style={{
                borderTop: "1px solid gray",
                height: "1px",
                marginTop: "12px",
              }}
            />
            <div
              style={{
                backgroundColor: "#fff",
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GoogleLogin
                clientId="323004842864-iqcot8usla2p8j86ee45bs4v9m86oojm.apps.googleusercontent.com"
                buttonText="Signup with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ opacity: 0.6 }}>
        <Particlejsloginsignup />
      </div>

      <Smallfooter />
    </>
  );
}
