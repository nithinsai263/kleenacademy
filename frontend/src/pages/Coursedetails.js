import React from "react";
import "./Coursedetails.css";
import Coursedetailscard from "./components/Coursedetailscard";

import Coursedetailscontent from "./components/Coursedetailscontent";
import Navbar from "./components/AcademyNavbar";
import Smallfooter from "./components/Smallfooter";
import Pathcard from "./components/Pathcard";
import { useParams } from "react-router-dom";

import { courseoverviewcontent, coursepath } from "../graphql/gql";

import {  useQuery } from "@apollo/react-hooks";

const coursedetailscontent = [
  {
    title1: "What will you learn",
    title2: "Ipsum lorem woppy",
    content: [
      " Lorem ipsum dolor sit amet, consectetuer adipiscing eli consectetue adipiscing eli consectetuer adipiscing eli Lorem ipsum dolor sit amet, adipiscing eli conse. Lorem ipsum dolor sit amet, consectetuer adipiscing eli, consectetuer adipiscing eli.",
    ],
  },
  {
    title1: "Lorem Ipsum dollar",
    title2: "Ipsum lorem woppy",
    content: [
      " Lorem ipsum dolor sit amet, consectetuer adipiscing eli consectetue adipiscing eli consectetuer adipiscing eli Lorem ipsum dolor sit amet, adipiscing eli conse. Lorem ipsum dolor sit amet, consectetuer adipiscing eli, consectetuer adipiscing eli.",
      " Lorem ipsum dolor sit amet, consectetuer adipiscing eli consectetue adipiscing eli consectetuer adipiscing eli Lorem ipsum dolor sit amet, adipiscing eli conse. Lorem ipsum dolor sit amet, consectetuer adipiscing eli, consectetuer adipiscing eli.",
      " Lorem ipsum dolor sit amet, consectetuer adipiscing eli consectetue adipiscing eli consectetuer adipiscing eli Lorem ipsum dolor sit amet, adipiscing eli conse. Lorem ipsum dolor sit amet, consectetuer adipiscing eli, consectetuer adipiscing eli.",
    ],
  },
];
const sections = [
  "Lorem Ipsum",
  "Lorem Ipsum",
  "Lorem Ipsum",
  "Lorem Ipsum",
  "Lorem Ipsum",
  "Lorem Ipsum",
  "Lorem Ipsum",
];
const coursedetailscard = [
  {
    title1: "lorem & dolar",
    title2: "lorem & ipsum",
    image: "https://via.placeholder.com/500",
    content:
      "Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetudolor sit amet,  consectetuer ader adipiscing eli consectetuer adipiscing eli Lorem.",
  },
];
const pathcard = [
  {
    title1: "lorem & dolar",
    title2: "lorem & ipsum",
    image: "https://via.placeholder.com/500",
    content:
      "Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem.Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem.Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem",
    courses: [
      { coursetitle: "HTML", cousrseid: "fjsnfkjnkfa" },
      { coursetitle: "CSS", cousrseid: "fjsnfkjnkfa" },
      { coursetitle: "Javascript", cousrseid: "fjsnfkjnkfa" },
    ],
  },
];
function Coursedetails({ history }) {
  let { id } = useParams();

  const {
    loading: overviewcontentloading,
    data: overviewcontentdata,
    error,
  } = useQuery(courseoverviewcontent, {
    variables: { course_id: String(id) },
  });

  const {
    loading: coursepathloading,
    data: coursepathdata,
    error: coursepatherror,
  } = useQuery(coursepath, {
    variables: { course_id: String(id) },
  });

  return (
    <>
      <Navbar />
      <div className='coursedetails-content'>
        <div className='coursedetails-coursecard-container'>
          {overviewcontentdata && (
            <Coursedetailscard
              title1={overviewcontentdata.findcourse.course_name1}
              title2={overviewcontentdata.findcourse.course_name2}
              content={overviewcontentdata.findcourse.description}
              course_id={String(id)}
              history={history}
            />
          )}
        </div>
        {overviewcontentdata && (
          <Coursedetailscontent
            coursedetailcontent={
              overviewcontentdata.findcourse.overview.coursedetailscontent
            }
            sections={overviewcontentdata.findcourse.overview.sections}
          />
        )}

        <div className='coursedetails-relavent-path-header'>
          <h1 className='coursedetails-relavent-path-sub-header1'> Relavent</h1>
          <h1 className='coursedetails-relavent-path-sub-header2'> Path</h1>
        </div>
        <div className='coursedetails-pathcard-container'>
          {coursepathdata && coursepathdata.findpath !== null && (
            <Pathcard
              title1={coursepathdata.findpath.path_title1}
              title2={coursepathdata.findpath.path_title2}
              content={coursepathdata.findpath.description}
              image={coursepathdata.findpath.photo}
              courses={coursepathdata.findpath.courses}
            />
          )}
        </div>

        <Smallfooter />
      </div>
    </>
  );
}

export default Coursedetails;
