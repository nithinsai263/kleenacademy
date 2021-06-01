import React, { useState, useEffect } from "react";
import CompletedPathCard from "./components/CompletedPathCards";
import AcademyNavbar from "./components/AcademyNavbar";
import Smallfooter from "./components/Smallfooter";
import { userid, pathuserdata, pathcarddetails } from "../graphql/gql";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

import "./MyPaths.css";

const inprogressPaths = [
  {
    title1: "lorem & dolar",
    title2: "lorem & ipsum",
    image: "https://via.placeholder.com/500",
    tag: "medium",
    content:
      "Lorem ipsum dolem ipsum dolor sit amet,  consectetuer aor sit amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem ipsum dolor sit amet,  consectetuer aem.  dolor sit amet,  consectetuer adipiscing eli con  dolor sit amet,  consectetuer adipiscing eli con",
    percent: 50,
    completedcourses: [
      { name: "Lorem & dollar", percent: 100, tag: "medium" },
      { name: "Lorem & dollar", percent: 10, tag: "easy" },
    ],
  },
];
const completedPaths = [
  {
    title1: "lorem & dolar",
    title2: "lorem & ipsum",
    image: "https://via.placeholder.com/500",
    tag: "easy",
    content:
      "Lorem ipsum dolor siem ipsum dolor sit amet,  consectetuer at amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem.  dolor sit amet,  conem ipsum dolor sit amet,  consectetuer asectetuer adipiscing eli con  dolor sit amet,  consectetuer adipiscing eli con",
    percent: 100,
    completedcourses: [
      { name: "Lorem & dollar", percent: 100, tag: "easy" },
      { name: "Lorem & dollar", percent: 100, tag: "easy" },
    ],
  },
  {
    title1: "lorem & dolar",
    title2: "lorem & ipsum",
    image: "https://via.placeholder.com/500",
    tag: "easy",
    content:
      "Lorem ipsum dolor sit aem ipsum dolor sit amet,  consectetuer amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem.  dolor sit amet,  consectetuem ipsum dolor sit amet,  consectetuer aer adipiscing eli con  dolor sit amet,  consectetuer adipiscing eli con",
    percent: 100,
    completedcourses: [{ name: "Lorem & dollar", percent: 100, tag: "easy" }],
  },
  {
    title1: "lorem & dolar",
    title2: "lorem & ipsum",
    image: "https://via.placeholder.com/500",
    tag: "easy",
    content:
      "Lorem ipsum dolor sit amet,  conem ipsum dolor sit amet,  consectetuer aem ipsum dolor sit amet,  consectetuer asectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem.  dolor sit amet,  consectetuer adipiscing eem ipsum dolor sit amet,  consectetuer ali con  dolor sit amet,  consectetuer adipiscing eli con",
    percent: 100,
    completedcourses: [{ name: "Lorem & dollar", percent: 100, tag: "easy" }],
  },
];

// {completedPaths.map((completedpath) => (
//   <CompletedPathCard
//     title1={completedpath.title1}
//     title2={completedpath.title2}
//     content={completedpath.content}
//     image={completedpath.image}
//     percent={completedpath.percent}
//     completedcourses={completedpath.completedcourses}
//   />
// ))}

function MyPaths() {
  const [active, setActive] = useState(0);
  const { data: userid_data } = useQuery(userid);
  const { data: pathcarddetails_data } = useQuery(pathcarddetails);
  const [pathuserdata1, { data: pathuserdata_data }] = useLazyQuery(
    pathuserdata
  );

  useEffect(() => {
    if (userid_data) {
      pathuserdata1({
        variables: { id: String(userid_data.me) },
      });
    }
  }, [userid_data]);
  return (
    <>
      <AcademyNavbar authenticated={true} />
      <div className='mypaths-parent-container'>
        <div className='mypaths-type-wrapper'>
          <h1
            onClick={() => setActive(0)}
            className={active === 0 ? "mypaths-type2" : "mypaths-type1"}
          >
            Inprogress
          </h1>
          <h1
            onClick={() => setActive(1)}
            className={active === 1 ? "mypaths-type2" : "mypaths-type1"}
          >
            Completed
          </h1>
        </div>
        <div className='mypaths-completedpaths-cards-container'>
          {active === 1 && (
            <div className='mypath-default-back-color'>
              {pathuserdata_data &&
                pathcarddetails_data &&
                pathuserdata_data.userdata.paths.inprogress_paths.map(
                  (item) => {
                    var temppercentage = 0;
                    var tempnumb = 0;
                    for (var i = 0; i < item.courses.length; i++) {
                      for (
                        var k = 0;
                        k <
                        pathuserdata_data.userdata.courses.inprogress_courses
                          .length;
                        k++
                      ) {
                        if (
                          item.courses[i].course_id ===
                            pathuserdata_data.userdata.courses
                              .inprogress_courses[k].course_id &&
                          pathuserdata_data.userdata.courses.inprogress_courses[
                            k
                          ].course_completed === 1
                        ) {
                          tempnumb = tempnumb + 1;
                        }
                      }
                    }
                    temppercentage = Math.floor(
                      (tempnumb / item.courses.length) * 100
                    );
                    for (
                      var i = 0;
                      i < pathcarddetails_data.findallpaths.length;
                      i++
                    ) {
                      if (
                        item.path_id ===
                        pathcarddetails_data.findallpaths[i].path_id
                      ) {
                        if (temppercentage === 100) {
                          return (
                            <CompletedPathCard
                              title1={
                                pathcarddetails_data.findallpaths[i].path_title1
                              }
                              title2={
                                pathcarddetails_data.findallpaths[i].path_title2
                              }
                              content={
                                pathcarddetails_data.findallpaths[i].description
                              }
                              percent={100}
                              completedcourses={
                                pathcarddetails_data.findallpaths[i].courses
                              }
                            />
                          );
                        }
                      }
                    }
                  }
                )}
            </div>
          )}
          {active === 0 && (
            <div className='mypath-default-back-color'>
              {pathuserdata_data &&
                pathcarddetails_data &&
                pathuserdata_data.userdata.paths.inprogress_paths.map(
                  (item) => {
                    var temppercentage = 0;
                    var tempnumb = 0;
                    for (var i = 0; i < item.courses.length; i++) {
                      for (
                        var k = 0;
                        k <
                        pathuserdata_data.userdata.courses.inprogress_courses
                          .length;
                        k++
                      ) {
                        if (
                          item.courses[i].course_id ===
                            pathuserdata_data.userdata.courses
                              .inprogress_courses[k].course_id &&
                          pathuserdata_data.userdata.courses.inprogress_courses[
                            k
                          ].course_completed === 1
                        ) {
                          tempnumb = tempnumb + 1;
                        }
                      }
                    }
                    temppercentage = Math.floor(
                      (tempnumb / item.courses.length) * 100
                    );
                    for (
                      var i = 0;
                      i < pathcarddetails_data.findallpaths.length;
                      i++
                    ) {
                      if (
                        item.path_id ===
                        pathcarddetails_data.findallpaths[i].path_id
                      ) {
                        if (temppercentage !== 100) {
                          return (
                            <CompletedPathCard
                              title1={
                                pathcarddetails_data.findallpaths[i].path_title1
                              }
                              title2={
                                pathcarddetails_data.findallpaths[i].path_title2
                              }
                              content={
                                pathcarddetails_data.findallpaths[i].description
                              }
                              percent={temppercentage}
                              completedcourses={
                                pathcarddetails_data.findallpaths[i].courses
                              }
                            />
                          );
                        }
                      }
                    }
                  }
                )}
            </div>
          )}
        </div>
      </div>
      <Smallfooter />
    </>
  );
}

export default MyPaths;
