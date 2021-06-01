import React, { useEffect, useState } from "react";
import "./Pathcard.css";
import DifficultyTag from "./DifficultyTag";
import PathCardExtension from "./PathCardExtension";
import Boost from "../images/boost.png";
import {
  userid,
  addpathuser,
  pathuserdata,
  findpathwithid,
} from "../../graphql/gql";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";

// courses.map((item) => {
//   return {
//     course_id: String(item.course_id),
//     course_name1: String(item.course_name1),
//   };
// }),

import coursephoto from "../images/path.png";
function Pathcard({
  image,
  title1,
  title2,
  content,
  courses,
  path_id,
  history,
}) {
  const [modulesexpand, Setmodulesexpand] = useState(false);
  const { data: userid_data, loading: userid_loading } = useQuery(userid);
  const [addpath] = useMutation(addpathuser);
  const [pathuserdataobj, { data: pathuserdata_data }] = useLazyQuery(
    pathuserdata
  );

  const { data: pathdataid_data } = useQuery(findpathwithid, {
    variables: { id: path_id },
  });

  let course_flag = 0;

  useEffect(() => {
    if (userid_data) {
      pathuserdataobj({
        variables: { id: String(userid_data.me) },
      });
    }
  }, [userid_data]);

  // async function handlecontinue(){
  //   if(userid_data){

  //   }
  // }

  async function handlecontinue() {
    history.push("/mypaths");
  }

  async function handleadd() {
    if (userid_data) {
      if (pathdataid_data) {
        if (
          parseInt(pathuserdata_data.userdata.flashes) <
          parseInt(pathdataid_data.findpathid.flashes)
        ) {
          alert("need more flashes");
        } else {
          var temp = [];
          temp = courses.map((item) => {
            return {
              course_id: String(item.course_id),
              course_name1: String(item.course_name1),
              flag: 0,
            };
          });
          temp[0].flag = 1;
          const res = await addpath({
            variables: {
              id: userid_data.me,
              path_id: path_id,
              path_title1: title1,
              path_title2: title2,
              courses: temp,
              flashes: pathdataid_data.findpathid.flashes,
            },
          });
          if (res) {
            history.go(0);
          }
        }
      }
    }
  }

  return (
    <>
      <div className="pathcard-main-parent">
        <div className="pathcard-imageflow-container">
          <div
            className="pathcard-image-container"
            style={{ backgroundImage: `url(${coursephoto})` }}
          >
            <div>
              <h1 className="pathcard-image-heading1">{title1}</h1>
              <h1 className="pathcard-image-heading2">{title2}</h1>
            </div>
          </div>

          <div className="pathcard-flow-container">
            <div className="pathcard-flow-horizontal-line">
              {courses.map((course) => (
                <div className="pathcard-flow-circle"></div>
              ))}
            </div>
            <div className="pathcard-flow-labels-container">
              {courses.map((course) => (
                <p className="pathcard-flow-labels"> {course.course_name}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="pathcard-subheading-container">
          <h4 className="pathcard-subheading-heading1">{title1}</h4>
          <h4 className="pathcard-subheading-heading2">{title2}</h4>
        </div>
        <DifficultyTag className="pathcard-tag" tag="easy" />
        <div>
          <p className="pathcard-content">{content}</p>
        </div>
        <div className="pathcard-bottom-container">
          <>
            <div className="pathcard-bottom-subcontainer">
              <div
                className="pathcard-bottom-subcontainer-modules"
                onClick={() => Setmodulesexpand(!modulesexpand)}
              >
                {courses.length} Modules
              </div>
              <p className="pathcard-bottom-subcontainer-progress">
                0% complete
              </p>
            </div>
          </>
          <>
            <div className="pathcard-bottom-subcontainer">
              <div className="pathcard-boost-container">
                <p style={{ paddingRight: 5 }}>30</p>
                <img style={{ height: "18px" }} src={Boost} />
              </div>
              {pathuserdata_data &&
                pathuserdata_data.userdata.paths.inprogress_paths.map(
                  (item) => {
                    if (item.path_id === path_id) {
                      course_flag = 1;
                      return (
                        <button
                          onClick={handlecontinue}
                          className="pathcard-bottom-enroll-button"
                        >
                          Continue
                        </button>
                      );
                    }
                  }
                )}
              {course_flag === 0 && (
                <button
                  onClick={handleadd}
                  className="pathcard-bottom-enroll-button"
                >
                  Enroll
                </button>
              )}
            </div>
          </>
        </div>
        {modulesexpand ? (
          <div style={{ paddingTop: "10px" }}>
            <PathCardExtension courses={courses} />
          </div>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}

export default Pathcard;
