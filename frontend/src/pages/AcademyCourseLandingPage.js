import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import Pathcard from "./components/Pathcard";
import CourseComponent from "./components/CourseComponent";
import AcademyNavbar from "./components/AcademyNavbar";
import Smallfooter from "./components/Smallfooter";
import Particle from "./particle";

import { coursecarddetails, pathcarddetails } from "../graphql/gql";
import { useQuery } from "@apollo/react-hooks";

import circle1 from "./images/academyicon1.png";
import circle2 from "./images/academyicon2.png";
import circle3 from "./images/academyicon3.png";

import "./AcademyCourseLandingPage.css";

const listing = [
  {
    id: 1,
    title1: "Course",
    title2: " 1",
    courseheading: "Coming soon",
    coursetext:
      "Lorem ipsum dolor sit amet, consec adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem. eli consectetuer adipiscing eli Lorem. eli consectetuer",
  },
  {
    id: 2,
    title1: "Course",
    title2: " 2",
    courseheading: "Coming soon",
    coursetext:
      "Lorem ipsum dolor sit amet, consec adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem. eli consectetuer adipiscing eli Lorem. eli consectetuer",
  },
  {
    id: 3,
    title1: "Course",
    title2: " 3",
    courseheading: "Coming soon",
    coursetext:
      "Lorem  dolor sit amet, consec adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem. eli consectetuer adipiscing eli Lorem. eli consectetuer",
  },
  {
    id: 4,
    title1: "Course",
    title2: "4",
    courseheading: "Coming soon",
    coursetext:
      "Lorem ipsum dolor sit amet, consec adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem. eli consectetuer adipiscing eli Lorem. eli consectetuer",
  },
];
const pathcard = [
  {
    title1: "Coming",
    title2: " Soon",
    image: "https://via.placeholder.com/500",
    content:
      "Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli  Lorem.Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem.Lorem ipsum dolor sit amet,  m.Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetuer adipiconsectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem",
    courses: [
      { course_name1: "Course 1", cousrseid: "fjsnfkjnkfa" },
      { course_name1: "Course 2", cousrseid: "fjsnfkjnkfa" },
      { course_name1: "Course 3", cousrseid: "fjsnfkjnkfa" },
    ],
  },
];
let renderListing = [];
let renderListing2 = [];

function AcademyCourseLandingPage() {
  let temp = [];
  renderListing = [];
  renderListing2 = [];
  for (let i = 0; i < listing.length; i++) {
    if (i % 3 === 0 && i > 0) {
      renderListing.push(temp);
      temp = [];
    }
    temp.push(listing[i]);
  }
  if (temp.length !== 0) {
    renderListing.push(temp);
    temp = [];

    let temp2 = [];
    for (let i = 0; i < listing.length; i++) {
      if (i % 2 === 0 && i > 0) {
        renderListing2.push(temp2);
        temp2 = [];
      }
      temp2.push(listing[i]);
    }
    if (temp2.length !== 0) {
      renderListing2.push(temp2);
      temp2 = [];
    }
  }

  const { data: courseCardData, loading: courseCardLoading } = useQuery(
    coursecarddetails
  );

  const { data: pathCardData, loading: pathCardLoading } = useQuery(
    pathcarddetails
  );

  return (
    <>
      <AcademyNavbar />

      <div className="wrap">
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
        <div className="c"></div>
      </div>

      <div className="academy-landing-maincontainer">
        <div className="academy-landing-container">
          <div className="academy-login-container">
            <h1 className="academy-login-header">Cyber Security Training</h1>
            <p className="academy-login-text">
              You are at the rightplace to learn. We make it easier for your
              Cyber Security journey.{" "}
            </p>
            <div style={{ textAlign: "center" }}>
              <Link to="/joinnow" style={{ textDecoration: "none" }}>
                <h7 className="academy-signup-container">Sign Up</h7>
              </Link>
            </div>
          </div>
        </div>
        <div className="academy-des">
          <div className="academy-des-container">
            <img className="academy-des-circle-img" src={circle1} />
            <div className="academy-des-textcontainer">
              <p className="academy-des-heading">Exclusive </p>
              <p className="academy-des-text">Learning Paths</p>
            </div>
          </div>
          <div className="academy-des-container">
            <img className="academy-des-circle-img" src={circle2} />
            <div className="academy-des-textcontainer">
              <p className="academy-des-heading">Real-Time</p>
              <p className="academy-des-text">Courses</p>
            </div>
          </div>
          <div className="academy-des-container">
            <img className="academy-des-circle-img" src={circle3} />
            <div className="academy-des-textcontainer">
              <p className="academy-des-heading">Wide Range</p>
              <p className="academy-des-text">of Challenges</p>
            </div>
          </div>
        </div>
        <div id="academy-particlestars">
          <Particle />
        </div>
        <div
          style={{
            position: "relative",
          }}
        >
          <div>
            <p className="academy-courses-heading">Cyber Security Courses</p>

            {courseCardLoading && <div>Loading...</div>}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              {courseCardData &&
                courseCardData.findall.map((item) => {
                  return (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {console.log(item.course_name2)}
                        <CourseComponent
                          title1={item.course_name1}
                          title2={item.course_name2}
                          courseheading={item.subtitle}
                          coursetext={item.description}
                          course_id={item.course_id}
                          flag={true}
                        />
                      </div>
                    </>
                  );
                })}
            </div>
            <div className="academy-explore-container">
              <div style={{ cursor: "pointer", zIndex: 10 }}>
                <p>
                  Explore more <span style={{ color: "#ff4d14" }}>courses</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="academy-paths-container">
          <p className="academy-path-heading">Cyber Security Paths</p>
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
                  />
                </div>
              );
            })}
        </div>
      </div>

      <Smallfooter />
    </>
  );
}

export default AcademyCourseLandingPage;

/*
{this.props.coursecarddetails.map((item) => {
                    return (
                      <CourseComponent
                        title1={item.course_name1}
                        title2={item.course_name2}
                        courseheading={item.subtitle}
                        coursetext={item.description}
                        flag={true}
                      />
                    );
                  })}






                  async fetchdata() {
    var data = await this.props.coursecarddetails;
    if (data.loading) {
      return <div>loading</div>;
    } else {
      return Object.Keys(data.findall).map((item, i) => {
        return (
          <CourseComponent
            title1={data.findall[item].course_name1}
            title2={data.findall[item].course_name2}
            courseheading={data.findall[item].subtitle}
            coursetext={data.findall[item].description}
            flag={true}
            key={i}
          />
        );
      });
    }
  }

                  */
