import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";

import { MenuItem, TextareaAutosize } from "@material-ui/core";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { findall, editcoursedetails } from "../../graphql/gql";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function EditCourse({ history }) {
  const [inputField, setInputField] = useState([
    { course_name: "", course_id: "" },
  ]);
  const { data, loading } = useQuery(findall);
  const [courseupdate] = useMutation(editcoursedetails);
  const [tempcourse, setTempcourse] = useState([
    {
      id: "",
      course_name1: "",
      course_name2: "",
      description: "",
      difficulty: "",
      subtitle: "",
      flashes: "",
    },
  ]);

  const settemp = (title, courseid) => {
    setInputField({ course_name: title, course_id: courseid });
    if (data) {
      data.findall.map((item) => {
        if (item.id === courseid) {
          setTempcourse({
            id: item.id,
            course_name1: item.course_name1,
            course_name2: item.course_name2,
            description: item.description,
            difficulty: item.difficulty,
            subtitle: item.subtitle,
            flashes: item.flashes,
          });
        }
      });
    }
  };
  const handleSubmit = async () => {
    const res = await courseupdate({
      variables: {
        id: tempcourse.id,
        course_name1: tempcourse.course_name1,
        course_name2: tempcourse.course_name2,
        description: tempcourse.description,
        difficulty: tempcourse.difficulty,
        subtitle: tempcourse.subtitle,
        flashes: tempcourse.flashes,
      },
    });
    if (res) {
      history.go(0);
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          width: "100%",
        }}
      >
        <Header />
        <div style={{ minHeight: "100vh", backgroundColor: "#ebedef" }}>
          <div style={{ marginTop: "20px" }}>
            {data && (
              <TextField
                style={{ width: "150px" }}
                id='select'
                label='Course'
                value={inputField.course_name}
                name='course_name_temp'
                select
              >
                {data.findall.map((course) => {
                  const name1 = String(course.course_name1);
                  const name2 = String(course.course_name2);
                  const title = name1 + " " + name2;
                  const courseid = String(course.id);
                  const passedvalue = title + "." + courseid;
                  return (
                    <MenuItem
                      onClick={() => settemp(title, courseid)}
                      value={passedvalue}
                    >
                      {title}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
            {data &&
              inputField.course_id !== "" &&
              data.findall.map((item) => {
                if (item.id === inputField.course_id) {
                  return (
                    <>
                      <div>
                        <TextField
                          style={{
                            width: "30%",
                          }}
                          required
                          name='coursetitle1'
                          label='Course Title 1'
                          variant='filled'
                          value={tempcourse.course_name1}
                          placeholder='Course Name'
                          onChange={(e) =>
                            setTempcourse({
                              course_name1: e.target.value,
                              course_name2: tempcourse.course_name2,
                              id: tempcourse.id,
                              description: tempcourse.description,
                              difficulty: tempcourse.difficulty,
                              subtitle: tempcourse.subtitle,
                              flashes: tempcourse.flashes,
                            })
                          }
                        />
                      </div>
                      <div>
                        <TextField
                          style={{
                            width: "30%",
                          }}
                          required
                          name='coursetitle2'
                          label='Course Title 2'
                          variant='filled'
                          value={tempcourse.course_name2}
                          placeholder='Course Name'
                          onChange={(e) =>
                            setTempcourse({
                              course_name1: tempcourse.course_name1,
                              course_name2: e.target.value,
                              id: tempcourse.id,
                              description: tempcourse.description,
                              difficulty: tempcourse.difficulty,
                              subtitle: tempcourse.subtitle,
                              flashes: tempcourse.flashes,
                            })
                          }
                        />
                      </div>
                      <div>
                        <TextField
                          style={{
                            width: "30%",
                          }}
                          required
                          name='coursesubtitle'
                          label='Course Subtitle'
                          variant='filled'
                          value={tempcourse.subtitle}
                          placeholder='Course Subtitle'
                          onChange={(e) =>
                            setTempcourse({
                              course_name1: tempcourse.course_name1,
                              course_name2: tempcourse.course_name2,
                              id: tempcourse.id,
                              description: tempcourse.description,
                              difficulty: tempcourse.difficulty,
                              subtitle: e.target.value,
                              flashes: tempcourse.flashes,
                            })
                          }
                        />
                      </div>
                      <div>
                        <TextField
                          style={{
                            width: "30%",
                          }}
                          required
                          name='flashes'
                          label='Flashes'
                          variant='filled'
                          value={tempcourse.flashes}
                          placeholder='Flashes'
                          onChange={(e) =>
                            setTempcourse({
                              course_name1: tempcourse.course_name1,
                              course_name2: tempcourse.course_name2,
                              id: tempcourse.id,
                              description: tempcourse.description,
                              difficulty: tempcourse.difficulty,
                              subtitle: tempcourse.subtitle,
                              flashes: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <TextField
                          style={{
                            width: "30%",
                          }}
                          required
                          name='badge'
                          label='Badge Name'
                          variant='filled'
                          placeholder='Badge Name'
                        />

                        <Button
                          style={{ marginTop: "16px", backgroundColor: "#ccc" }}
                        >
                          Upload Badge
                        </Button>
                      </div>

                      <div>
                        <TextField
                          style={{ width: "150px", marginBottom: "30px" }}
                          id='select'
                          label='Difficulty'
                          value={tempcourse.difficulty}
                          select
                          onChange={(e) =>
                            setTempcourse({
                              course_name1: tempcourse.course_name1,
                              course_name2: tempcourse.course_name2,
                              id: tempcourse.id,
                              description: tempcourse.description,
                              difficulty: e.target.value,
                              subtitle: tempcourse.subtitle,
                              flashes: tempcourse.flashes,
                            })
                          }
                        >
                          <MenuItem value='easy'>Easy</MenuItem>
                          <MenuItem value='medium'>Medium</MenuItem>
                          <MenuItem value='hard'>Hard</MenuItem>
                        </TextField>
                      </div>
                      <div>
                        <h6>Content on Card</h6>
                        <TextareaAutosize
                          style={{
                            width: "85%",
                            margin: "8px",
                            marginBottom: "30px",
                          }}
                          rowsMin='10'
                          required
                          name='description'
                          label='Description'
                          value={tempcourse.description}
                          placeholder='Description'
                          onChange={(e) =>
                            setTempcourse({
                              course_name1: tempcourse.course_name1,
                              course_name2: tempcourse.course_name2,
                              id: tempcourse.id,
                              description: e.target.value,
                              difficulty: tempcourse.difficulty,
                              subtitle: tempcourse.subtitle,
                              flashes: tempcourse.flashes,
                            })
                          }
                        />
                      </div>
                      <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        onClick={() => handleSubmit()}
                      >
                        Edit
                      </Button>
                    </>
                  );
                }
              })}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default EditCourse;
