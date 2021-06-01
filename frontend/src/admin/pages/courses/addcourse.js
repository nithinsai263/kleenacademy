import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { MenuItem, TextareaAutosize } from "@material-ui/core";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { addcourse } from "../../graphql/gql";

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

function AddCourse() {
  const [createcourse] = useMutation(addcourse);
  const classes = useStyles();
  const [coursetitle1, Setcoursetitle1] = useState("");
  const [coursetitle2, Setcoursetitle2] = useState("");
  const [flashes, Setflashes] = useState("");

  const [coursesubtitle, Setcoursesubtitle] = useState("");
  const [description, Setdescription] = useState("");
  const [difficulty, Setdifficulty] = useState("");
  const [badgename, Setbadgename] = useState("");

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), sections: ["fsjk"] },
  ]);
  const [courseDetails, setCourseDetails] = useState([
    { id: uuidv4(), title1: "", title2: "", content: [""] },
  ]);

  const [moduleDetails, setModuleDetails] = useState([
    {
      id: uuidv4(),
      module_name: "",
      module_video: "",
      module_content: [
        { id: uuidv4(), title: "", image: "", description: [""] },
      ],
      module_questions: [
        {
          id: uuidv4(),
          question: "",
          answer: "",
          flashes: "",
        },
      ],
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newcoursedetailscontent = courseDetails.map(({ id, ...rest }) => ({
      ...rest,
    }));
    const newsections = inputFields[0].sections;

    cleaningData();
    const newmodules = moduleDetails.map(({ id, ...rest }) => ({
      ...rest,
    }));
    const res = createcourse({
      variables: {
        course_name1: coursetitle1,
        course_name2: coursetitle2,
        subtitle: coursesubtitle,
        description: description,
        difficulty: difficulty,
        flashes: flashes,
        overview: {
          coursedetailscontent: newcoursedetailscontent,
          sections: newsections,
        },
        modules: newmodules,
      },
    });
    if (res) console.log("done uploaded");
  };

  const handleCourseDetails = (id, event) => {
    const newCourseDetailsFields = courseDetails.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setCourseDetails(newCourseDetailsFields);
  };

  const handleAddCourseDetailsFields = () => {
    setCourseDetails([
      ...courseDetails,
      { id: uuidv4(), title1: "", title2: "", content: [""] },
    ]);
  };

  const handleRemoveCourseDetailsFields = (id) => {
    const values = [...courseDetails];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setCourseDetails(values);
  };

  const handleCourseDetailsDescription = (id, index, event) => {
    const newCourseDetailsDescription = courseDetails.map((c) => {
      if (id === c.id) {
        c.content[index] = event.target.value;
      }
      return c;
    });

    setCourseDetails(newCourseDetailsDescription);
  };

  const handleAddExtraCourseDescription = (id) => {
    const newCourseDetailsDescription = courseDetails.map((c) => {
      if (id === c.id) {
        c.content = [...c.content, ""];
      }
      return c;
    });
    setCourseDetails(newCourseDetailsDescription);
  };

  const handleRemoveExtraCourseDescription = (id, index) => {
    const newCourseDetailsDescription = courseDetails.map((c) => {
      if (id === c.id) {
        c.content.splice(index, 1);
      }
      return c;
    });
    setCourseDetails(newCourseDetailsDescription);
  };

  const handleChangeInput = (id, index, event) => {
    const newInputFields = inputFields.map((c) => {
      if (id === c.id) {
        c.sections[index] = event.target.value;
      }
      return c;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = (id) => {
    const newInputFields = inputFields.map((c) => {
      if (id === c.id) {
        c.sections = [...c.sections, ""];
      }
      return c;
    });
    setInputFields(newInputFields);
  };

  const handleRemoveFields = (id, index) => {
    const newInputFields = inputFields.map((c) => {
      if (id === c.id) {
        c.sections.splice(index, 1);
      }
      return c;
    });
    setInputFields(newInputFields);
  };
  const handleRemoveModule = (id) => {
    const values = [...moduleDetails];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setModuleDetails(values);
  };
  const handleAddModule = () => {
    setModuleDetails([
      ...moduleDetails,
      {
        id: uuidv4(),
        module_name: "",
        module_video: "",
        module_content: [
          { id: uuidv4(), title: "", image: "", description: [""] },
        ],
        module_questions: [
          {
            id: uuidv4(),
            question: "",
            answer: "",
            flashes: "",
          },
        ],
      },
    ]);
  };
  const handleAddSubModule = (id) => {
    const newModuleDetailsField = moduleDetails.map((i) => {
      if (id === i.id) {
        i.module_content = [
          ...i.module_content,
          { id: uuidv4(), title: "", image: "", description: [""] },
        ];
      }
      return i;
    });
    setModuleDetails(newModuleDetailsField);
  };
  const handleAddDescriptionSubModule = (id, modcontid) => {
    const newModuleDetailsField = moduleDetails.map((i) => {
      if (id === i.id) {
        i.module_content.map((ii) => {
          if (ii.id === modcontid) {
            ii.description = [...ii.description, ""];
          }
        });
      }
      return i;
    });
    setModuleDetails(newModuleDetailsField);
  };
  const handleRemoveDescriptionSubModule = (id, modcontid, idx) => {
    const newModuleDetailsField = moduleDetails.map((i) => {
      if (id === i.id) {
        i.module_content.map((ii) => {
          if (ii.id === modcontid) {
            ii.description.splice(idx, 1);
          }
        });
      }
      return i;
    });
    setModuleDetails(newModuleDetailsField);
  };

  const handleRemoveSubModule = (id, modcontid) => {
    const newModuleDetailsFields = moduleDetails.map((i) => {
      if (id === i.id) {
        i.module_content.splice(
          i.module_content.findIndex((value) => value.id === modcontid),
          1
        );
      }
      return i;
    });
    setModuleDetails(newModuleDetailsFields);
  };
  const handleModuleDetails = (id, event) => {
    const newModuleDetailsFields = moduleDetails.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setModuleDetails(newModuleDetailsFields);
  };
  const handleModuleContentImage = (id, modcontid, event) => {
    const newmoduleContent = moduleDetails.map((i) => {
      if (id === i.id) {
        i.module_content.map((ii) => {
          if (ii.id === modcontid) {
            ii.image = event.target.value;
          }
        });
      }
      return i;
    });
    setModuleDetails(newmoduleContent);
  };

  const handleModuleContentTitle = (id, modcontid, event) => {
    const newmoduleContent = moduleDetails.map((i) => {
      if (id === i.id) {
        i.module_content.map((ii) => {
          if (ii.id === modcontid) {
            ii.title = event.target.value;
          }
        });
      }
      return i;
    });
    setModuleDetails(newmoduleContent);
  };

  const handleModuleContentDescriptionDetails = (idx, id, modcontid, e) => {
    const newmoduleContent = moduleDetails.map((i) => {
      if (id === i.id) {
        i.module_content.map((ii) => {
          if (ii.id === modcontid) {
            ii.description[idx] = e.target.value;
          }
        });
      }
      return i;
    });
    setModuleDetails(newmoduleContent);
  };
  const handleModuleQuestions = (e, id, qsid) => {
    const newmoduleContent = moduleDetails.map((i) => {
      if (id === i.id) {
        i.module_questions.map((qs) => {
          if (qs.id === qsid) qs[e.target.name] = e.target.value;
        });
      }
      return i;
    });
    setModuleDetails(newmoduleContent);
  };

  const cleaningData = () => {
    const newModuleDetailsField = moduleDetails.map((i) => {
      i.module_content = i.module_content.map(({ id, ...rest }) => ({
        ...rest,
      }));
      i.module_questions = i.module_questions.map(({ id, ...rest }) => ({
        ...rest,
      }));
      return i;
    });
    setModuleDetails(newModuleDetailsField);
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
          <div>
            <h1>Add New Course</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
              <h2>Course Card</h2>
              <div>
                <TextField
                  style={{
                    width: "30%",
                  }}
                  required
                  name="coursetitle1"
                  label="Course Title 1"
                  variant="filled"
                  value={coursetitle1}
                  placeholder="Course Name"
                  onChange={(e) => {
                    Setcoursetitle1(e.target.value);
                  }}
                />
              </div>
              <div>
                <TextField
                  style={{
                    width: "30%",
                  }}
                  required
                  name="coursetitle2"
                  label="Course Title 2"
                  variant="filled"
                  value={coursetitle2}
                  placeholder="Course Name"
                  onChange={(e) => {
                    Setcoursetitle2(e.target.value);
                  }}
                />
              </div>
              <div>
                <TextField
                  style={{
                    width: "30%",
                  }}
                  required
                  name="coursesubtitle"
                  label="Course Subtitle"
                  variant="filled"
                  value={coursesubtitle}
                  placeholder="Course Subtitle"
                  onChange={(e) => {
                    Setcoursesubtitle(e.target.value);
                  }}
                />
              </div>
              <div>
                <TextField
                  style={{
                    width: "30%",
                  }}
                  required
                  name="flashes"
                  label="Flashes"
                  variant="filled"
                  value={flashes}
                  placeholder="Flashes"
                  onChange={(e) => {
                    Setflashes(e.target.value);
                  }}
                />
              </div>

              <div>
                <TextField
                  style={{
                    width: "30%",
                  }}
                  required
                  name="badge"
                  label="Badge Name"
                  variant="filled"
                  value={badgename}
                  placeholder="Badge Name"
                  onChange={(e) => {
                    Setbadgename(e.target.value);
                  }}
                />

                <Button style={{ marginTop: "16px", backgroundColor: "#ccc" }}>
                  Upload Badge
                </Button>
              </div>

              <div>
                <TextField
                  style={{ width: "150px", marginBottom: "30px" }}
                  id="select"
                  label="Difficulty"
                  value={difficulty}
                  onChange={(e) => {
                    Setdifficulty(e.target.value);
                  }}
                  select
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </TextField>
              </div>
              <div>
                <h6>Content on Card</h6>
                <TextareaAutosize
                  style={{ width: "85%", margin: "8px", marginBottom: "30px" }}
                  rowsMin="10"
                  required
                  name="description"
                  label="Description"
                  value={description}
                  placeholder="Description"
                  onChange={(e) => {
                    Setdescription(e.target.value);
                  }}
                />
              </div>
              <h2>Overview of course</h2>
              {courseDetails.map((courseDetail) => (
                <>
                  <h4>Course Details</h4>
                  <IconButton
                    disabled={courseDetails.length === 1}
                    onClick={() =>
                      handleRemoveCourseDetailsFields(courseDetail.id)
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={handleAddCourseDetailsFields}>
                    <AddIcon />
                  </IconButton>
                  <div>
                    <TextField
                      style={{
                        width: "30%",
                      }}
                      required
                      name="title1"
                      label="DetailsTitle1"
                      variant="filled"
                      value={courseDetail.title1}
                      placeholder="Detail Title1"
                      onChange={(event) =>
                        handleCourseDetails(courseDetail.id, event)
                      }
                    />
                    <TextField
                      style={{
                        width: "30%",
                      }}
                      required
                      name="title2"
                      label="DetailsTitle2"
                      variant="filled"
                      value={courseDetail.title2}
                      placeholder="Detail Title2"
                      onChange={(event) =>
                        handleCourseDetails(courseDetail.id, event)
                      }
                    />
                  </div>

                  {courseDetail.content.map(
                    (coursedetaildescription, index) => (
                      <>
                        <TextareaAutosize
                          style={{
                            width: "85%",
                            margin: "8px",
                            marginBottom: "30px",
                          }}
                          rowsMin="10"
                          required
                          name="content"
                          label="Description"
                          value={coursedetaildescription}
                          placeholder="Description"
                          onChange={(event) => {
                            handleCourseDetailsDescription(
                              courseDetail.id,
                              index,
                              event
                            );
                          }}
                        />
                        <IconButton
                          disabled={courseDetail.content.length === 1}
                          onClick={() =>
                            handleRemoveExtraCourseDescription(
                              courseDetail.id,
                              index
                            )
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            handleAddExtraCourseDescription(courseDetail.id)
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </>
                    )
                  )}
                </>
              ))}
              <h2>Sections</h2>
              {inputFields.map((inputField) => (
                <div key={inputField.id} style={{ marginBottom: "30px" }}>
                  {inputField.sections.map((section, index) => (
                    <div>
                      <TextField
                        style={{
                          width: "30%",
                        }}
                        required
                        name="section"
                        label="Module Name"
                        variant="filled"
                        value={section}
                        onChange={(event) =>
                          handleChangeInput(inputField.id, index, event)
                        }
                      />

                      <IconButton
                        disabled={inputField.sections.length === 1}
                        onClick={() => handleRemoveFields(inputField.id, index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleAddFields(inputField.id)}
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
              ))}

              <div style={{ marginBottom: "30px", marginTop: "60px" }}>
                <h2>Modules</h2>
                <>
                  {moduleDetails.map((moduleDetail) => (
                    <div key={moduleDetail.id} style={{ marginTop: "20px" }}>
                      <h4>Module Detail</h4>
                      <IconButton
                        disabled={moduleDetails.length === 1}
                        onClick={() => handleRemoveModule(moduleDetail.id)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <IconButton onClick={() => handleAddModule()}>
                        <AddIcon />
                      </IconButton>
                      <div>
                        <TextField
                          style={{
                            width: "30%",
                          }}
                          required
                          name="module_name"
                          label="Module Name"
                          variant="filled"
                          placeholder="Module Name"
                        />
                      </div>
                      <div>
                        <TextField
                          style={{
                            width: "30%",
                          }}
                          name="module_video"
                          label="Module Video Link"
                          variant="filled"
                          value={moduleDetail.module_video}
                          placeholder="Module Video Link"
                          onChange={(event) =>
                            handleModuleDetails(moduleDetail.id, event)
                          }
                        />
                      </div>
                      {moduleDetail.module_content.map((modcont) => {
                        return (
                          <div>
                            <TextField
                              style={{
                                width: "30%",
                              }}
                              required
                              name="title"
                              label="Title"
                              variant="filled"
                              value={modcont.title}
                              placeholder="Title"
                              onChange={(event) =>
                                handleModuleContentTitle(
                                  moduleDetail.id,
                                  modcont.id,
                                  event
                                )
                              }
                            />
                            <TextField
                              style={{
                                width: "30%",
                              }}
                              name="image"
                              label="Image Link"
                              variant="filled"
                              value={modcont.image}
                              placeholder="Image Link"
                              onChange={(event) =>
                                handleModuleContentImage(
                                  moduleDetail.id,
                                  modcont.id,
                                  event
                                )
                              }
                            />
                            <IconButton
                              disabled={
                                moduleDetail.module_content.length === 1
                              }
                              onClick={() =>
                                handleRemoveSubModule(
                                  moduleDetail.id,
                                  modcont.id
                                )
                              }
                            >
                              <RemoveIcon />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                handleAddSubModule(moduleDetail.id)
                              }
                            >
                              <AddIcon />
                            </IconButton>
                            {modcont.description.map((modcontdesc, idx) => {
                              return (
                                <>
                                  <TextareaAutosize
                                    style={{
                                      width: "85%",
                                      margin: "8px",
                                      marginBottom: "30px",
                                    }}
                                    rowsMin="10"
                                    required
                                    name="description"
                                    value={modcontdesc}
                                    label="Description"
                                    placeholder="Description"
                                    onChange={(e) => {
                                      handleModuleContentDescriptionDetails(
                                        idx,
                                        moduleDetail.id,
                                        modcont.id,
                                        e
                                      );
                                    }}
                                  />
                                  <IconButton
                                    disabled={modcont.description.length === 1}
                                    onClick={() =>
                                      handleRemoveDescriptionSubModule(
                                        moduleDetail.id,
                                        modcont.id,
                                        idx
                                      )
                                    }
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                  <IconButton
                                    onClick={() =>
                                      handleAddDescriptionSubModule(
                                        moduleDetail.id,
                                        modcont.id
                                      )
                                    }
                                  >
                                    <AddIcon />
                                  </IconButton>
                                </>
                              );
                            })}
                          </div>
                        );
                      })}
                      {moduleDetail.module_questions.map((modulequestion) => {
                        return (
                          <div>
                            <h4>Module Questions</h4>

                            <TextareaAutosize
                              style={{
                                width: "85%",
                                margin: "8px",
                              }}
                              rowsMin="10"
                              required
                              value={modulequestion.question}
                              name="question"
                              label="Question"
                              placeholder="Question"
                              onChange={(e) =>
                                handleModuleQuestions(
                                  e,
                                  moduleDetail.id,
                                  modulequestion.id
                                )
                              }
                            />
                            <div>
                              <TextField
                                style={{
                                  width: "30%",
                                }}
                                required
                                name="answer"
                                label="Respective Answer"
                                value={modulequestion.answer}
                                variant="filled"
                                placeholder="Respective Answeritle"
                                onChange={(e) =>
                                  handleModuleQuestions(
                                    e,
                                    moduleDetail.id,
                                    modulequestion.id
                                  )
                                }
                              />
                              <TextField
                                style={{
                                  width: "30%",
                                }}
                                required
                                name="flashes"
                                label="Flashes"
                                value={modulequestion.flashes}
                                variant="filled"
                                placeholder="Flashes"
                                onChange={(e) =>
                                  handleModuleQuestions(
                                    e,
                                    moduleDetail.id,
                                    modulequestion.id
                                  )
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </>
              </div>

              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Add Course
              </Button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AddCourse;
