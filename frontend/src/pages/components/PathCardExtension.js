import React, { useEffect } from "react";
import ProgressBar from "./ProgressBar";
import DifficultyTag from "./DifficultyTag";
import GradTag from "./GradTag";
import MediaQuery from "react-responsive";
import Completiontik from "../images/tikcompleted.png";
import { Link } from "react-router-dom";
import Flash from "../images/flash.png";
import "./PathCardExtension.css";
import {
  coursecarddetails,
  userinprogresscoursesdata,
  userid,
  courseoverviewcontent,
} from "../../graphql/gql";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

function PathCardExtension({ courses }) {
  const { data } = useQuery(coursecarddetails);
  const { data: userid_data } = useQuery(userid);
  const [
    lazyuserinprogresscoursesdata,
    { data: inprogresscourses_data, loading: inprogresscourses_loading },
  ] = useLazyQuery(userinprogresscoursesdata);
  const [findcourse, { data: coursedata }] = useLazyQuery(
    courseoverviewcontent
  );

  useEffect(() => {
    if (userid_data) {
      lazyuserinprogresscoursesdata({
        variables: { id: String(userid_data.me) },
      });
    }
  }, [userid_data]);

  return (
    <div className="pathCardExtension-parent-container">
      {courses.map((course) => {
        findcourse({
          variables: { course_id: course.course_id },
        });
        console.log(coursedata);
        return (
          <div>
            <div style={{ color: "#777", fontSize: "14px" }}>
              {course.course_name}
            </div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
}

export default PathCardExtension;

/*
course.percent === 100 ? (
            
            <div className='pathcardExtension-tik-image-container'>
              <div
                className='pathCardExtension-tik-image'
                style={{ backgroundImage: `url(${Completiontik})` }}
              />
            </div>
          ) : (
            <div className='pathcardExtension-tik-image-container'>
              <MediaQuery minWidth={650}>
                <ProgressBar width={200} percent={course.percent} />
              </MediaQuery>
              <MediaQuery maxWidth={650}>
                <ProgressBar width={100} percent={course.percent} />
              </MediaQuery>
            </div>
          )
          */
