import React, { useEffect } from "react";
import CourseImage from "../images/coursebackgroud.png";
import Boost from "../images/flashes.png";
import DifficultyTag from "./DifficultyTag";
import { Link } from "react-router-dom";
import {
  pathuserdata,
  userid,
  userinprogresscoursesdata,
} from "../../graphql/gql";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

import "./CourseComponent.css";

function CourseComponent({
  flag,
  title1,
  title2,
  courseheading,
  coursetext,
  course_id,
}) {
  const { data: userid_data } = useQuery(userid);
  const [pathuserdataobj, { data: pathuserdata_data }] = useLazyQuery(
    pathuserdata
  );
  let course_flag = 0;
  useEffect(() => {
    if (userid_data && flag === true) {
      pathuserdataobj({
        variables: { id: String(userid_data.me) },
      });
    }
  }, [userid_data]);
  return (
    <div className='course-component-maincontainer'>
      <div
        className='course-component-image'
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${CourseImage})`,
        }}
      >
        <div>
          <p className='course-component-name'>{title1} </p>
          <p className='course-component-name2'>{title2}</p>
        </div>
      </div>
      <div className='course-component-summary'>
        <div>
          <p className='course-component-summary-heading'>{courseheading}</p>
          <p className='course-component-summary-text'>{coursetext} </p>
        </div>
        <div className='course-component-footer'>
          <div className='course-component-difficulty'>
            <DifficultyTag className='pathcard-tag' tag='easy' />
          </div>
          <div className='course-component-enroll-container'>
            <div className='course-component-cost-container'>
              <p style={{ paddingRight: 10 }}>30</p>
              <img className='course-component-cost-img' src={Boost} />
            </div>
            {pathuserdata_data &&
              flag === true &&
              pathuserdata_data.userdata.courses.inprogress_courses.map(
                (item) => {
                  var mod = null;

                  if (item.course_id === course_id) {
                    for (var i = 0; i < item.module.length; i++) {
                      if (item.module[i].flag === 1) {
                        mod = item.module[i].module_id;
                      }
                    }
                    if (mod === null) {
                      mod = item.module[0].module_id;
                    }
                    course_flag = 1;
                    return (
                      <Link
                        to={`/videocourses/${course_id}/${mod}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className='course-component-enroll'>
                          <p>Continue</p>
                        </div>
                      </Link>
                    );
                  }
                }
              )}
            {course_flag === 0 && (
              <Link
                to={`/coursedetails/${course_id}`}
                style={{ textDecoration: "none" }}
              >
                <div className='course-component-enroll'>
                  <p>Enroll</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseComponent;
