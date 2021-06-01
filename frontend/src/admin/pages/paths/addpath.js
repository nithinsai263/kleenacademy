import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { MenuItem, TextareaAutosize } from "@material-ui/core";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { addpath, findall } from "../../graphql/gql";
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

function AddPath() {
  const [createpath, res] = useMutation(addpath);
  const { data, loading } = useQuery(findall);
  const [certificateversion, Setcertificateversion] = useState("");
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), course_name_temp: "", course_name: "", course_id: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArr = inputFields.map(({ id, course_name_temp, ...rest }) => ({
      ...rest,
    }));
    console.log(newArr);
    const res = createpath({
      variables: {
        path_title1: pathtitle1,
        path_title2: pathtitle2,
        description: description,
        certificateversion: certificateversion,
        difficulty: difficulty,
        flashes: flashes,
        courses: newArr,
      },
    });
    if (res) console.log("added flash");
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        const splitter1 = event.target.value.split(".")[0];
        const splitter2 = event.target.value.split(".")[1];
        i[event.target.name] = event.target.value;
        i["course_name"] = splitter1;
        i["course_id"] = splitter2;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), course_name_temp: "", course_name: "", course_id: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };
  const [pathtitle1, Setpathtitle1] = useState("");
  const [pathtitle2, Setpathtitle2] = useState("");
  const [description, Setdescription] = useState("");
  const [flashes, Setflashes] = useState("");
  const [difficulty, Setdifficulty] = useState("");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Header />
        <div style={{ minHeight: "100vh", backgroundColor: "#ebedef" }}>
          <Container>
            <h1>Add New Path</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
              <div>
                <TextField
                  required
                  name="pathtitle1"
                  label="Path Title 1"
                  variant="filled"
                  value={pathtitle1}
                  placeholder="Path Name"
                  onChange={(e) => {
                    Setpathtitle1(e.target.value);
                  }}
                />
              </div>
              <div>
                <TextField
                  required
                  name="pathtitle2"
                  label="Path Title 2"
                  variant="filled"
                  value={pathtitle2}
                  placeholder="Path Name"
                  onChange={(e) => {
                    Setpathtitle2(e.target.value);
                  }}
                />
              </div>
              <div>
                <TextField
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
                  required
                  name="certificate"
                  label="Certificate Version"
                  variant="filled"
                  value={certificateversion}
                  placeholder="Certificate Version"
                  onChange={(e) => {
                    Setcertificateversion(e.target.value);
                  }}
                />
              </div>
              <div>
                <TextareaAutosize
                  style={{ width: "90%", margin: "8px" }}
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
              <div>
                <TextField
                  style={{ width: "100px" }}
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

              {inputFields.map((inputField) => (
                <div key={inputField.id} style={{ marginTop: "20px" }}>
                  {data && (
                    <TextField
                      style={{ width: "150px" }}
                      id="select"
                      label="Courses"
                      value={inputField.course_name_temp}
                      name="course_name_temp"
                      select
                      onChange={(event) =>
                        handleChangeInput(inputField.id, event)
                      }
                    >
                      {data.findall.map((course) => {
                        
                        const name1 = String(course.course_name1);
                        const name2 = String(course.course_name2);
                        const title = name1 + " " + name2;
                        const courseid = String(course.id);
                        const passedvalue = title + "." + courseid;
                        return <MenuItem value={passedvalue}>{title}</MenuItem>;
                      })}
                    </TextField>
                  )}

                  <IconButton
                    disabled={inputFields.length === 1}
                    onClick={() => handleRemoveFields(inputField.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={handleAddFields}>
                    <AddIcon />
                  </IconButton>
                </div>
              ))}
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Add
              </Button>
            </form>
          </Container>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AddPath;
