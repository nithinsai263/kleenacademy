import React, { useEffect, useState } from "react";
import boost from "./images/boost.png";
import CourseComponent from "./components/CourseComponent";
import "./AccountDashboard.css";
import AcademyNavbar from "./components/AcademyNavbar";
import Pathcard from "./components/Pathcard";
import Smallfooter from "./components/Smallfooter";
import Buybolts from "./BuyBoults";
import Subscription from "./Subscription";
import Discord from "./Discord";
import MediaQuery from "react-responsive";
import ProgressBar from "./components/ProgressBar";
import {
  userid,
  coursecarddetails,
  dashboarduserdata,
  pathcarddetails,
} from "../graphql/gql";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

const badgelist = [
  {
    image: "image",
    description: "why you recieved the badge",
  },
  {
    image: "image",
    description: "why you recieved the badge",
  },
  {
    image: "image",
    description: "why you recieved the badge",
  },
];

const certificatelist = [
  {
    name: "name of the certificate",
    download: "download",
  },
  {
    name: "name of the certificate",
    download: "download",
  },
  {
    name: "name of the certificate",
    download: "download",
  },
];

function AccountDashboard({ history }) {
  const [badge, setBadge] = useState(false);
  const [certificate, setCertificate] = useState(false);
  const [courses, setCourses] = useState(false);
  const [dashboarddata, { data: userdata_data }] = useLazyQuery(
    dashboarduserdata,
    {
      fetchPolicy: "network-only",
    }
  );

  const { data: pathCardData, loading: pathCardLoading } = useQuery(
    pathcarddetails
  );

  const { data: userid_data, error: userid_error } = useQuery(userid);

  const { data: courses_data } = useQuery(coursecarddetails);

  useEffect(() => {
    if (userid_data) {
      dashboarddata({
        variables: { id: String(userid_data.me) },
      });
    }
    if (userid_error) {
      history.push("/login");
    }
  }, [userid_data, userid_error]);

  function handlebadge() {
    setBadge(!badge);
    setCertificate(false);
    setCourses(false);
  }

  function handlecertificate() {
    setCertificate(!certificate);
    setBadge(false);
    setCourses(false);
  }

  function handlecourses() {
    setCertificate(false);
    setBadge(false);
    setCourses(!courses);
  }

  return (
    <>
      {" "}
      {userid_data && (
        <>
          <AcademyNavbar authenticated={true} />
          <div className="dashboard-main-container">
            <div className="dashboard-background-container">
              <div
                style={{
                  zIndex: 100,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                      backgroundRepeat: "no-repeat",
                      border: "1px solid gray",
                      backgroundSize: "contain",
                      backgroundImage: userdata_data
                        ? `url(
                               ${userdata_data.userdata.profileimageurl})`
                        : `url(
                                https://lh3.googleusercontent.com/MOf9Kxxkj7GvyZlTZOnUzuYv0JAweEhlxJX6gslQvbvlhLK5_bSTK6duxY2xfbBsj43H=w300)`,
                    }}
                  />
                </div>
                {userdata_data && (
                  <p className="dashboard-name-text">
                    {userdata_data.userdata.name}
                  </p>
                )}

                {userdata_data && (
                  <div className="dashboard-account-boost">
                    <p className="dashboard-acoount-boost-number">
                      {userdata_data.userdata.flashes}
                    </p>
                    <div
                      className="dashboard-boost-image"
                      style={{ backgroundImage: `url(${boost})` }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="dashboard-progress-container">
              <div
                onClick={handlebadge}
                className="dashboard-progress-percentage"
              >
                <div>
                  <div className="dashboard-progress-background1">
                    <p className="dashboard-progress-percent1">30%</p>
                  </div>
                  <p className="dashboard-progress-text1">Badges</p>
                </div>
              </div>
              <div
                onClick={handlecertificate}
                className="dashboard-progress-percentage"
              >
                <div>
                  <div className="dashboard-progress-background2">
                    <p className="dashboard-progress-percent2">30%</p>
                  </div>
                  <p className="dashboard-progress-text2">Certificates</p>
                </div>
              </div>
              <div
                onClick={handlecourses}
                className="dashboard-progress-percentage"
              >
                <div>
                  <div className="dashboard-progress-background3">
                    <p className="dashboard-progress-percent3">30%</p>
                  </div>
                  <p className="dashboard-progress-text3">Courses</p>
                </div>
              </div>
            </div>
            {badge === true && (
              <div className="dashboard-badges-container">
                <div style={{ textAlign: "center" }}>Badges</div>
                {badgelist.map((item) => {
                  return (
                    <div className="dashboard-badges-container2">
                      <div>{item.image}</div>
                      <div>{item.description}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {certificate === true && (
              <div className="dashboard-badges-container">
                <div style={{ textAlign: "center" }}>Certificates</div>
                {certificatelist.map((item) => {
                  return (
                    <div className="dashboard-badges-container2">
                      <div>{item.name}</div>
                      <div>{item.download}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {courses === true && (
              <div className="dashboard-badges-container">
                <div style={{ textAlign: "center" }}>Courses</div>
                {userdata_data &&
                  userdata_data.userdata.courses.inprogress_courses.map(
                    (item) => {
                      var temppercentage = 0;
                      var tempnumb = 0;
                      for (var i = 0; i < item.module.length; i++) {
                        if (item.module[i].flag === 2) {
                          tempnumb = tempnumb + 1;
                        }
                      }
                      temppercentage = Math.floor(
                        (tempnumb / item.module.length) * 100
                      );
                      return (
                        <div className="dashboard-badges-container2">
                          <div>
                            {item.course_name1} {item.course_name2}
                          </div>
                          <div>
                            <MediaQuery minWidth={950}>
                              <ProgressBar
                                width={400}
                                percent={temppercentage}
                              />
                            </MediaQuery>
                            <MediaQuery maxWidth={950}>
                              <ProgressBar
                                width={200}
                                percent={temppercentage}
                              />
                            </MediaQuery>
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            )}
            <div>
              <p className="dashboard-wishlist-text">
                Recommended <span style={{ color: "#ff4d15" }}>Courses</span>
              </p>
              <div className="dashboard-wishlist-container">
                {courses_data &&
                  courses_data.findall.map((item) => {
                    return (
                      <CourseComponent
                        title1={item.course_name1}
                        title2={item.course_name2}
                        courseheading={item.subtitle}
                        coursetext={item.description}
                        course_id={item.id}
                        flag={true}
                        history={history}
                      />
                    );
                  })}
              </div>
            </div>
            <div>
              <p className="dashboard-wishlist-text">
                Recommended <span style={{ color: "#ff4d15" }}>Paths</span>
              </p>
              <div className="academy-paths-container">
                {pathCardData &&
                  pathCardData.findallpaths.map((item) => {
                    return (
                      <div className="academy-pathcard-container">
                        <Pathcard
                          path_id={item.path_id}
                          title1={item.path_title1}
                          title2={item.path_title2}
                          courses={item.courses}
                          content={item.description}
                          history={history}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          {userdata_data && (
            <Buybolts
              flashes={userdata_data.userdata.flashes}
              history={history}
            />
          )}
          <Subscription />
          <Discord />
          <Smallfooter />
        </>
      )}
    </>
  );
}

export default AccountDashboard;
