import React, { useState, useEffect } from "react";
import "./AcademyProfilePage.css";
import AcademyNavbar from "./components/AcademyNavbar";
import Smallfooter from "./components/Smallfooter";
import {
  profileupdate,
  userid,
  savepictureurl,
  s3SignMutation,
  profilesettingsuser,
  logout,
} from "../graphql/gql";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import moment from "moment";

function AcademyProfilePage({ history }) {
  const [profile, setProfile] = useState(false);
  const [profilepictureurl] = useMutation(savepictureurl);
  const [s3sign] = useMutation(s3SignMutation);
  const [files, setFiles] = useState(null);
  const { data: userid_data } = useQuery(userid);
  const [userprofileupdate] = useMutation(profileupdate);
  const [profileuser, { data: profileuser_data }] = useLazyQuery(
    profilesettingsuser
  );
  const [userlogout] = useMutation(logout);
  const logoutuser = (id) => {
    try {
      const res = userlogout();
      if (res) alert("looged out");
      history.push("/");
    } catch (err) {
      alert("issh");
    }
  };
  useEffect(() => {
    if (userid_data) {
      profileuser({
        variables: { id: String(userid_data.me) },
      });
    }
  }, [userid_data]);

  const formik = useFormik({
    initialValues: {
      name: "",
      profession: "",
    },

    onSubmit: async (values) => {
      if (userid_data) {
        const res = await userprofileupdate({
          variables: {
            id: userid_data.me,
            name:
              values.name === "" ? profileuser_data.userdata.name : values.name,
            profession: values.profession,
          },
        });
        try {
          if (files) {
            const response = await s3sign({
              variables: {
                filename: formatFilename(files.name),
                filetype: files.type,
              },
            });
            const { signedRequest, url } = response.data.signS3;
            await uploadToS3(files, signedRequest);

            if (userid_data) {
              // const response2 = await deletecurrentimg({
              //   variables: {
              //     id: userid_data.me,
              //   },
              // });
              console.log(url);

              const response3 = await profilepictureurl({
                variables: {
                  profilepictureurl: url,
                  id: userid_data.me,
                },
              });
              if (response3) alert("profile picture updated");
            }
          }
        } catch (err) {
          console.log(err);
          alert("please try again");
        }
        if (res) {
          history.push("/dashboard");
        }
      }
    },
  });

  //upload s3
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles[0]);
      console.log(acceptedFiles[0]);
    },
  });

  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    await axios
      .put(signedRequest, file, options)
      .then(() => console.log("Uploaded"))
      .catch((err) => console.error("Could not upload", err));
  };

  const formatFilename = (filename) => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  return (
    <>
      <AcademyNavbar authenticated={true} />
      <div className="academy-profile-main-container">
        <div className="academy-profile-container">
          <div className="academy-profile-menu-container">
            <div className="academy-profile-menu-container2">
              <div
                style={{
                  height: "60px",
                  width: "60px",
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
              <div className="academy-profile-menu-name">
                {profileuser_data && <p>{profileuser_data.userdata.name}</p>}
              </div>

              <div className="academy-profile-menu-list-container">
                <div
                  className="academy-profile-menu-list"
                  onClick={() => setProfile(true)}
                  style={{
                    backgroundColor: profile === true ? "#2d2d2d" : "#121212",
                  }}
                >
                  <p>Profile</p>
                </div>
                <div
                  className="academy-profile-menu-list"
                  onClick={() => setProfile(false)}
                  style={{
                    backgroundColor: profile === false ? "#2d2d2d" : "#121212",
                  }}
                >
                  <p>Account</p>
                </div>
                <div className="academy-profile-menu-list">
                  <p
                    className="academy-profile-menu-logout"
                    onClick={() => logoutuser()}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="academy-profile-information-container">
            {profile === true && (
              <div>
                <div className="academy-profile-information-header">
                  <p className="academy-profile-information-header1">Profile</p>
                  <p className="academy-profile-information-header2">
                    Add information about youself
                  </p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="academy-profile-information-inputmain-container">
                    <div className="academy-profile-information-inputmain-wrapper">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <div style={{ marginBottom: "20px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                height: "60px",
                                width: "60px",
                                borderRadius: "50%",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundColor: "wheat",
                                border: "1px solid gray",
                                backgroundImage: files
                                  ? `url(files.path)`
                                  : profileuser_data
                                  ? `url(
                               ${profileuser_data.userdata.profileimageurl})`
                                  : `url(
                                https://lh3.googleusercontent.com/MOf9Kxxkj7GvyZlTZOnUzuYv0JAweEhlxJX6gslQvbvlhLK5_bSTK6duxY2xfbBsj43H=w300)`,
                              }}
                            />

                            {files && (
                              <>
                                <div
                                  style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "50%",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "contain",
                                    backgroundColor: "wheat",
                                    backgroundImage: files.path,
                                  }}
                                />
                              </>
                            )}
                          </div>

                          <div className="academy-profile-page">
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <p>Change Profile Picture</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="academy-profile-information-inputcontainer">
                        <p>Name:</p>
                        <input
                          type="text"
                          name="name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                        />
                      </div>

                      <div className="academy-profile-information-inputcontainer">
                        <p>Profession:</p>
                        <input
                          type="text"
                          name="profession"
                          onChange={formik.handleChange}
                          value={formik.values.profession}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="academy-profile-information-submit">
                    <div>
                      <input
                        type="submit"
                        name="Save"
                        value="Save"
                        className="academy-profile-information-save"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {profile === false && (
              <div>
                <div className="academy-profile-information-header">
                  <p className="academy-profile-information-header1">Account</p>
                  <p className="academy-profile-information-header2">
                    Edit account and password here
                  </p>
                </div>
                <div className="academy-profile-information-inputmain-container">
                  <div className="academy-profile-information-inputmain-wrapper">
                    <div className="academy-profile-information-inputcontainer">
                      <p>Email:</p>
                      <input type="text" />
                    </div>

                    <div className="academy-profile-information-inputcontainer">
                      <p>Password:</p>
                      <input type="text" />
                    </div>
                    <div className="academy-profile-information-inputcontainer">
                      <p>Confirm Password:</p>
                      <input type="text" />
                    </div>
                  </div>
                </div>
                <div className="academy-profile-information-submit">
                  <div className="academy-profile-information-save">
                    <p>Save</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Smallfooter />
    </>
  );
}

export default AcademyProfilePage;
