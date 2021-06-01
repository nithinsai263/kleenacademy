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

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { addflash } from "../../graphql/gql";

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
function AddFlash({history}) {
  const [createflash, res] = useMutation(addflash);
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), discount_coupon: "", discount_percent: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArr = inputFields.map(({ id, ...rest }) => ({ ...rest }));
    const res = createflash({
      variables: {
        flashes_no: flashes,
        amount: amount,
        discount: newArr,
      },
    });
    if (res) {
      history.go(0);
    }
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), discount_coupon: "", discount_percent: "" },
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
  const [flashes, Setflashes] = useState("");
  const [amount, Setamount] = useState("");
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Header />
        <div style={{ minHeight: "100vh", backgroundColor: "#ebedef" }}>
          <Container>
            <h1>Add New Flash</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
              <div className='myclass-textcontainer' style={{ marginBottom: "20px" }}>
                <TextField
                  required
                  name="flashes"
                  label="Flashes"
                  variant="filled"
                  value={flashes}
                  placeholder="Number of Flashes"
                  
                  onChange={(e) => {
                    Setflashes(e.target.value);
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <TextField
                  required
                  name="amount"
                  label="Amount"
                  variant="filled"
                  value={amount}
                  placeholder="amount"
                  onChange={(e) => {
                    Setamount(e.target.value);
                  }}
                />
              </div>
              {inputFields.map((inputField) => (
                <div key={inputField.id}>
                  <TextField
                    required
                    name="discount_coupon"
                    label="Discount Coupon"
                    variant="filled"
                    value={inputField.discount_coupon}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
                  <TextField
                    required
                    name="discount_percent"
                    label="Discount Rate"
                    variant="filled"
                    value={inputField.discount_percent}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
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

export default AddFlash;
