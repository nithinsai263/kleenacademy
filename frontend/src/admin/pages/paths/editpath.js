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
import { findallpaths, editpathdetails } from "../../graphql/gql";

function EditPath({ history }) {
  const { data: pathsdata, loading: pathsloading } = useQuery(findallpaths);
  const [inputField, setInputField] = useState([
    { path_name: "", path_id: "" },
  ]);

  const [temppath, setTemppath] = useState([
    {
      id: "",
      path_title1: "",
      path_title2: "",
      description: "",
      difficulty: "",
      flashes: "",
    },
  ]);

  const [updatepath] = useMutation(editpathdetails);

  const settemp = (title, pathid) => {
    setInputField({ path_name: title, path_id: pathid });
    if (pathsdata) {
      pathsdata.findallpaths.map((item) => {
        if (item.id === pathid) {
          setTemppath({
            id: item.id,
            path_title1: item.path_title1,
            path_title2: item.path_title2,
            description: item.description,
            difficulty: item.difficulty,
            flashes: item.flashes,
          });
        }
      });
    }
  };

  const handlesubmit = async () => {
    const res = await updatepath({
      variables: {
        id: temppath.id,
        path_title1: temppath.path_title1,
        path_title2: temppath.path_title2,
        description: temppath.description,
        difficulty: temppath.difficulty,
        flashes: temppath.flashes,
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
          {pathsdata && (
            <TextField
              style={{ width: "150px" }}
              id='select'
              value={inputField.path_name}
              label='Path'
              name='course_name_temp'
              select
            >
              {pathsdata.findallpaths.map((path) => {
                const name1 = String(path.path_title1);
                const name2 = String(path.path_title2);
                const title = name1 + " " + name2;
                const pathid = String(path.id);
                const passedvalue = title + "." + pathid;
                return (
                  <MenuItem onClick={() => settemp(title, pathid)}>
                    {title}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
          {pathsdata &&
            inputField.path_id !== "" &&
            pathsdata.findallpaths.map((item) => {
              if (item.id === inputField.path_id) {
                return (
                  <>
                    <div>
                      <TextField
                        style={{
                          width: "30%",
                        }}
                        required
                        name='pathtitle1'
                        label='Path Title 1'
                        variant='filled'
                        value={temppath.path_title1}
                        placeholder='Path Name'
                        onChange={(e) =>
                          setTemppath({
                            path_title1: e.target.value,
                            path_title22: temppath.path_title2,
                            id: temppath.id,
                            description: temppath.description,
                            difficulty: temppath.difficulty,
                            flashes: temppath.flashes,
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
                        name='pathtitle2'
                        label='Path Title 2'
                        variant='filled'
                        value={temppath.path_title2}
                        placeholder='Path Name'
                        onChange={(e) =>
                          setTemppath({
                            path_title1: temppath.path_title1,
                            path_title2: e.target.value,
                            id: temppath.id,
                            description: temppath.description,
                            difficulty: temppath.difficulty,
                            flashes: temppath.flashes,
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
                        value={temppath.flashes}
                        placeholder='Flashes'
                        onChange={(e) =>
                          setTemppath({
                            path_title1: temppath.path_title1,
                            path_title2: temppath.path_title2,
                            id: temppath.id,
                            description: temppath.description,
                            difficulty: temppath.difficulty,
                            flashes: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <TextField
                        style={{ width: "150px", marginBottom: "30px" }}
                        id='select'
                        label='Difficulty'
                        value={temppath.difficulty}
                        select
                        onChange={(e) =>
                          setTemppath({
                            path_title1: temppath.path_title1,
                            path_title2: temppath.path_title2,
                            id: temppath.id,
                            description: temppath.description,
                            difficulty: e.target.value,
                            flashes: temppath.flashes,
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
                        value={temppath.description}
                        placeholder='Description'
                        onChange={(e) =>
                          setTemppath({
                            path_title1: temppath.path_title1,
                            path_title2: temppath.path_title2,
                            id: temppath.id,
                            description: e.target.value,
                            difficulty: temppath.difficulty,
                            flashes: temppath.flashes,
                          })
                        }
                      />
                    </div>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      onClick={() => handlesubmit()}
                    >
                      Edit
                    </Button>
                  </>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default EditPath;
