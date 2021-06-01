import React, { useEffect } from "react";
import "./VideoCourse.css";
import ReactPlayer from "react-player";
import moduleflag1 from "./images/tikcompleted.png";
import moduleflag2 from "./images/threedot.png";
import AcademyNavbar from "./components/AcademyNavbar";
import Smallfooter from "./components/Smallfooter";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Popup from "./Popup";

import {
  coursecontent,
  userid,
  userinprogresscoursesdata,
  updatamoduleflag,
  completedcourse,
  questionreward,
} from "../graphql/gql";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";

function VideoCourse({ history }) {
  let { courseid, moduleid } = useParams();
  const { data, loading } = useQuery(coursecontent, {
    variables: { course_id: courseid },
    fetchPolicy: "network-only",
  });

  const [updatemoduleflag] = useMutation(updatamoduleflag);
  const { data: userid_data } = useQuery(userid, {
    fetchPolicy: "network-only",
  });
  const [finishcourse] = useMutation(completedcourse);

  const [
    getusercoursemodules_data,
    { data: usercoursemoduledata },
  ] = useLazyQuery(userinprogresscoursesdata, {
    fetchPolicy: "network-only",
  });

  const [questionrewardmutation] = useMutation(questionreward);

  useEffect(() => {
    if (userid_data) {
      getusercoursemodules_data({
        variables: { id: String(userid_data.me) },
      });
    }
  }, [userid_data]);

  var sec = null;
  var finishcount = 0;
  var finish = 0;
  var completed = 0;

  if (usercoursemoduledata) {
    for (
      var i = 0;
      i < usercoursemoduledata.userdata.courses.inprogress_courses.length;
      i++
    ) {
      if (
        usercoursemoduledata.userdata.courses.inprogress_courses[i]
          .course_id === courseid
      ) {
        completed =
          usercoursemoduledata.userdata.courses.inprogress_courses[i]
            .course_completed;
        sec =
          usercoursemoduledata.userdata.courses.inprogress_courses[i].module;
      }
    }
    if (sec !== null) {
      for (var i = 0; i < sec.length; i++) {
        if (sec[i].module_id === moduleid && sec[i].flag === 0) {
          sec[i].flag = 1;
        }
        if (sec[i].flag === 2) {
          finishcount = finishcount + 1;
        }
        if (finishcount === sec.length || finishcount === sec.length - 1) {
          finish = 1;
        }
      }
    }
  }

  var mod = null;
  if (data) {
    for (var i = 0; i < data.findcourse.modules.length; i++) {
      if (data.findcourse.modules[i].module_id === moduleid) {
        mod = data.findcourse.modules[i];
      }
    }
  }

  async function handlequestionsubmit() {
    if (userid_data) {
      const res = await questionrewardmutation({
        variables: {
          id: userid_data.me,
          flashes: "10",
          courseid: courseid,
          moduleid: moduleid,
        },
      });
      if (res) {
        history.go(0);
      }
    }
  }

  async function handlecomplete() {
    if (userid_data) {
      const res = await finishcourse({
        variables: {
          id: userid_data.me,
          course_id: courseid,
        },
      });
      if (res) {
        completed = 1;
        history.go(0);
      }
    }
  }

  async function handleclick() {
    if (usercoursemoduledata && userid_data) {
      for (var i = 0; i < sec.length; i++) {
        if (sec[i].module_id === moduleid) {
          sec[i].flag = 2;
        }
      }
      const res = await updatemoduleflag({
        variables: {
          id: userid_data.me,
          course_id: courseid,
          module: sec.map((item) => {
            return {
              module_name: String(item.module_name),
              module_id: String(item.module_id),
              flag: item.flag,
              question_flag: item.question_flag,
            };
          }),
        },
      });
    }
  }

  return (
    <>
      <AcademyNavbar authenticated={true} />
      <div className="video-course-parent-container">
        <div className="video-course-video-player">
          <ReactPlayer
            controls
            width="100%"
            url="https://youtu.be/J0DjcsK_-HY"
          />
        </div>
        <div className="video-course-content-container">
          <div className="video-course-content-wrapper">
            <h1 className="video-course-title-text">Course Content</h1>
            {data &&
              mod.module_content.map((currentsubmodule) => (
                <div className="video-course-sub-para-container">
                  <h3 className="video-course-sub-title-text">
                    {currentsubmodule.title}
                  </h3>
                  {currentsubmodule.description.map((paraIterator) => (
                    <>
                      <p className="video-course-content-para-text">
                        {paraIterator}
                      </p>
                    </>
                  ))}
                </div>
              ))}
            <div className="video-course-question-container">
              <h2 className="video-course-question-label">Question</h2>
              <p className="video-course-answer-following-text">
                Answer the question(s) below to complete this Section and earn
                +10 Boults!
              </p>
              {data &&
                mod !== null &&
                mod.module_questions.map((question) => {
                  return (
                    <>
                      <p className="video-course-question-text">
                        {question.question}
                      </p>
                      <input
                        type="text"
                        placeholder="Submit Your answer here"
                      />
                    </>
                  );
                })}
              <div className="video-course-question-submit">
                <div
                  onClick={handlequestionsubmit}
                  className="video-course-question-submitbutton"
                >
                  Submit
                </div>
              </div>
            </div>
          </div>
          <div className="video-course-module-responsive-wrapper">
            <div className="video-course-module-wrapper">
              <h1 className="video-course-module-title-text">Modules</h1>

              {usercoursemoduledata &&
                sec &&
                sec.map((submoduleIterator) => (
                  <div className="video-course-modules-container-in">
                    {submoduleIterator.module_id !== moduleid ? (
                      <div onClick={handleclick}>
                        <Link
                          to={`/videocourses/${courseid}/${submoduleIterator.module_id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <p className="video-course-modules-container-in-text">
                            {submoduleIterator.module_name}
                          </p>
                        </Link>
                      </div>
                    ) : (
                      <p className="video-course-modules-container-in-text">
                        {submoduleIterator.module_name}
                      </p>
                    )}

                    {submoduleIterator.flag == 2 && (
                      <div
                        className="video-course-modules-container-in-img"
                        style={{
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundImage: `url(${moduleflag1})`,
                        }}
                      />
                    )}
                    {submoduleIterator.flag == 1 && (
                      <div
                        className="video-course-modules-container-in-img"
                        style={{
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundImage: `url(${moduleflag2})`,
                        }}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {finish === 1 && completed === 0 && (
          <div
            onClick={handlecomplete}
            className="video-course-button-container"
          >
            <button className="video-course-next-button">Finish Course</button>
          </div>
        )}
        {completed === 1 && (
          <div className="video-course-completed-text">
            <p> Congratulations on Completing this Course</p>
          </div>
        )}
      </div>

      <Smallfooter />
    </>
  );
}

export default VideoCourse;

/*
<div className='video-course-modules-container'>
                    <h3 className='video-course-modules-container-text'>
                      {" "}
                      {module.moduletitle}
                    </h3>
                  </div>
                  */
