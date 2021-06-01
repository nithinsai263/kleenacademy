import React, { useEffect } from "react";

import DifficultyTag from "./DifficultyTag";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import "./Coursedetailscard.css";
import coursephoto from "../images/course.png";

import {
  userid,
  addcourseuser,
  courseoverviewcontent,
  dashboarduserdata,
} from "../../graphql/gql";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";

function Coursedetailscard({
  image,
  title1,
  title2,
  content,
  stars,
  course_id,
  history,
}) {
  const {
    data: courseoverviewcontent_data,
    loading: courseoverviewcontent_loading,
  } = useQuery(courseoverviewcontent, { variables: { course_id: course_id } });
  const { data: userid_data, loading: userid_loading } = useQuery(userid);
  const [addcourse] = useMutation(addcourseuser);
  const [dashboarddata, { data: userdata_data }] = useLazyQuery(
    dashboarduserdata
  );

  useEffect(() => {
    if (userid_data) {
      dashboarddata({
        variables: { id: String(userid_data.me) },
      });
    }
  }, [userid_data]);

  async function handlesubmit() {
    if (userid_data && userdata_data) {
      if (courseoverviewcontent_data) {
        if (
          parseInt(userdata_data.userdata.flashes) <
          parseInt(courseoverviewcontent_data.findcourse.flashes)
        ) {
          alert("You need more flashes");
        } else {
          var temp = [];
          temp = courseoverviewcontent_data.findcourse.modules.map((item) => ({
            module_id: item.id,
            module_name: item.module_name,
            flag: 0,
            question_flag: 0,
          }));
          temp[0].flag = 1;

          const res = await addcourse({
            variables: {
              id: userid_data.me,
              course_id: course_id,
              course_name1: title1,
              course_name2: title2,
              module: temp,
              flashes: courseoverviewcontent_data.findcourse.flashes,
            },
          });

          if (res) {
            history.push(`/videocourses/${course_id}/${temp[0].module_id}`);
          }
        }
      }
    }
  }

  if (userid_loading) {
    return <h1>loading</h1>;
  }
  if (userid_data) {
    return (
      <div className="coursedetailscard-container">
        <div className="debug">
          <div
            style={{ backgroundImage: `url(${coursephoto})` }}
            className="coursedetailscard-image"
          >
            <div className="coursedetailscard-image-heading">
              <h1 className="coursedetailscard-image-heading1"> {title1}</h1>
              <h1 className="coursedetailscard-image-heading2"> {title2}</h1>
            </div>
          </div>
        </div>
        <div className="coursedetailscard-text-container">
          <div>
            <div className="coursedetailscard-title-container">
              <h3 className="coursedetailscard-title-heading1"> {title1}</h3>
              <h3 className="coursedetailscard-title-heading2"> {title2}</h3>
            </div>
            <div className="coursedetailscard-difficult-tag">
              <DifficultyTag tag="easy" />
            </div>
            <div>
              <StarRating active={3} nonactive={2} />
            </div>
            <p className="coursedetailscard-content-text">{content}</p>
            <div className="coursedetailscard-enroll-button">
              <button
                onClick={handlesubmit}
                className="coursedetailscard-enroll"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Coursedetailscard;
