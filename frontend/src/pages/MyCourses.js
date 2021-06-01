import React, { useEffect, useState } from "react";
import CompletedCourseCard from "./components/CompletedCourseCard";
import InProgressCourseCard from "./components/InProgressCourseCard";
import AcademyNavbar from "./components/AcademyNavbar";
import Smallfooter from "./components/Smallfooter";
import {
  userinprogresscoursesdata,
  mycoursedetails,
  userid,
} from "../graphql/gql";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

import "./MyCourses.css";
const completedcourses = [
  {
    title1: "lorem & dolar",
    title2: "lorem & ipsum",
    image: "https://via.placeholder.com/500",
    tag: "easy",
    content:
      "Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem.  dolor sit amet,  consectetuer adipiscing eli con  dolor sit amet,  consectetuer adipiscing eli con",
  },
  {
    title1: "lorem & dolar",
    title2: "lorem & ipsum",
    image: "https://via.placeholder.com/500",
    tag: "medium",
    content:
      "Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem.  dolor sit amet,  consectetuer adipiscing eli con  dolor sit amet,  consectetuer adipiscing eli con",
  },
  {
    title1: "lorem & dolar",
    title2: "lorem & ipsum",
    image: "https://via.placeholder.com/500",
    tag: "hard",
    content:
      "Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem.  dolor sit amet,  consectetuer adipiscing eli con  dolor sit amet,  consectetuer adipiscing eli con",
  },
];
const inprogresscourses = [
  {
    title1: "lorem & dolar",
    title2: "lorem & ipsum",
    image: "https://via.placeholder.com/500",
    tag: "easy",
    content:
      "Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem.  dolor sit amet,  consectetuer adipiscing eli con  dolor sit amet,  consectetuer adipiscing eli con",
    percent: 30,
  },
  {
    title1: "lorem & dolar",
    title2: "lorem & ipsum",
    image: "https://via.placeholder.com/500",
    tag: "medium",
    content:
      "Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem.  dolor sit amet,  consectetuer adipiscing eli con  dolor sit amet,  consectetuer adipiscing eli con",
    percent: 80,
  },
  {
    title1: "lorem & dolar",
    title2: "lorem & ipsum",
    image: "https://via.placeholder.com/500",
    tag: "hard",
    content:
      "Lorem ipsum dolor sit amet,  consectetuer adipiscing eli consectetuer adipiscing eli consectetuer adipiscing eli Lorem.  dolor sit amet,  consectetuer adipiscing eli con  dolor sit amet,  consectetuer adipiscing eli con",
    percent: 10,
  },
];
function MyCourses() {
  const [active, setActive] = useState(0);
  const { data: userid_data, loading: userid_loading } = useQuery(userid);
  const [
    lazyuserinprogresscoursesdata,
    { data: inprogresscourses_data, loading: inprogresscourses_loading },
  ] = useLazyQuery(userinprogresscoursesdata);

  const {
    data: mycoursedetails_data,
    loading: mycoursedetails_loading,
  } = useQuery(mycoursedetails);
  const [listdata, setListData] = useState([]);

  useEffect(() => {
    if (userid_data) {
      lazyuserinprogresscoursesdata({
        variables: { id: String(userid_data.me) },
      });
    }
  }, [userid_data]);

  // if (!userid_loading) {
  // const {
  //   data: inprogresscourses_data,
  //   loading: inprogresscourses_loading,
  // } = useQuery(userinprogresscoursesdata, {
  //     variables: { id: String(userid_data.me) },
  //     skip: userid_data,
  //   });

  //   if (!inprogresscourses_loading) {
  //     inprogresscourses_data.userdata.courses.inprogress_courses.course_id.map(
  //       (item) => {
  //         const {
  //           data: mycoursedetails_data,
  //           loading: mycoursedetails_loading,
  //         } = useQuery(mycoursedetails, {
  //           variables: { course_id: String(item) },
  //           skip: inprogresscourses_data,
  //         });

  //         if (!mycoursedetails_loading) {
  //           let temp = {
  //             course_id: mycoursedetails_data.course_id,
  //             course_name1: mycoursedetails_data.course_name1,
  //             course_name2: mycoursedetails_data.course_name2,
  //             photo: mycoursedetails_data.photo,
  //             description: mycoursedetails_data.description,
  //             difficulty: mycoursedetails_data.difficulty,
  //           };

  //           setListData(listdata.push(temp));
  //           console.log(listdata);
  //         }
  //       }
  //     );
  //   }
  // }

  return (
    <>
      <AcademyNavbar authenticated={true} />
      <div className='mycourses-parent-container'>
        <div className='mycourses-type-wrapper'>
          <h1
            onClick={() => setActive(0)}
            className={active === 0 ? "mycourses-type2" : "mycourses-type1"}
          >
            Inprogress
          </h1>
          <h1
            onClick={() => setActive(1)}
            className={active === 1 ? "mycourses-type2" : "mycourses-type1"}
          >
            Completed
          </h1>
        </div>
        <div className='completedcourse-cards-container'>
          {active === 1 && (
            <div>
              {inprogresscourses_data && mycoursedetails_data && (
                <div>
                  {inprogresscourses_data.userdata.courses.inprogress_courses.map(
                    (item) => {
                      if (item.course_completed === 1) {
                        for (
                          var i = 0;
                          i < mycoursedetails_data.findall.length;
                          i++
                        ) {
                          if (
                            item.course_id ===
                            mycoursedetails_data.findall[i].course_id
                          ) {
                            return (
                              <InProgressCourseCard
                                title1={
                                  mycoursedetails_data.findall[i].course_name1
                                }
                                title2={
                                  mycoursedetails_data.findall[i].course_name2
                                }
                                image={mycoursedetails_data.findall[i].photo}
                                tag={mycoursedetails_data.findall[i].difficulty}
                                content={
                                  mycoursedetails_data.findall[i].description
                                }
                                percent={100}
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
          )}
          {active === 0 && (
            <div>
              {" "}
              {inprogresscourses_data && mycoursedetails_data && (
                <div>
                  {inprogresscourses_data.userdata.courses.inprogress_courses.map(
                    (item) => {
                      if (item.course_completed === 0) {
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
                        for (
                          var i = 0;
                          i < mycoursedetails_data.findall.length;
                          i++
                        ) {
                          if (
                            item.course_id ===
                            mycoursedetails_data.findall[i].course_id
                          ) {
                            return (
                              <InProgressCourseCard
                                title1={
                                  mycoursedetails_data.findall[i].course_name1
                                }
                                title2={
                                  mycoursedetails_data.findall[i].course_name2
                                }
                                image={mycoursedetails_data.findall[i].photo}
                                tag={mycoursedetails_data.findall[i].difficulty}
                                content={
                                  mycoursedetails_data.findall[i].description
                                }
                                percent={temppercentage}
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
          )}
        </div>
      </div>
      <Smallfooter />
    </>
  );
}

export default MyCourses;
