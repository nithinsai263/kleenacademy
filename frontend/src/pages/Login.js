import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import GoogleLogin from "react-google-login";

import "./Login.css";
import AcademyNavbar from "./components/AcademyNavbar";
import Smallfooter from "./components/Smallfooter";
import Particlejsloginsignup from "./components/Particlejsloginsignup";
import { setAccessToken } from "../accessToke";
import { login, googlelogin } from "../graphql/gql";

export default function Login({ history }) {
  const [userlogin] = useMutation(login);
  const [usergooglelogin] = useMutation(googlelogin);
  const responseGoogleLogin = async (response) => {
    try {
      const res = await usergooglelogin({
        variables: {
          email: response.profileObj.email,
          name: response.profileObj.name,
          googleId: response.profileObj.googleId,
        },
      });
      if (res) {
        setAccessToken(res.data.googlelogin.accessToken);
        history.push("/dashboard");
      }
    } catch (err) {
      alert(err);
      alert("Something went wrong");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const res = await userlogin({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      if (res) {
        console.log(res.data.login);
        setAccessToken(res.data.login.accessToken);
        if (!res.data.login.flag) {
          history.push("/dashboard");
        }
        history.push("/admindashboard");
      }
    },
  });

  return (
    <>
      <AcademyNavbar />

      <div className="contact-section" id="contact">
        <div className="login-container-1">
          <div className="login-content-wrapper">
            <form
              onSubmit={formik.handleSubmit}
              style={{ marginBottom: "15px" }}
            >
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
                  <p>
                    Forgot Password?
                    <span style={{ color: "#ff4d15", cursor: "pointer" }}>
                      {" "}
                      Click Here
                    </span>
                  </p>
                </div>
                <input
                  type="submit"
                  name="Login"
                  value="Login"
                  id="loginbutton"
                />
              </div>
            </form>
            <div style={{ borderTop: "1px solid gray", height: "1px" }} />
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
                buttonText="Login with Google"
                onSuccess={responseGoogleLogin}
                onFailure={responseGoogleLogin}
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
