import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from "react-select";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import authHeader from "../../../../services/authHeader";
import axios from "axios";
import userService from "../../../../services/userService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const statusOptions = [
  { value: "French", label: "French" },
  { value: "English", label: "English" },
  { value: "Arabic", label: "Arabic" },
  { value: "Spanish", label: "Spanish" },
];

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
];

const SkillForm = (props) => {
  //skill comp
  const [data, setData] = useState();
  const [successful, setSuccessful] = useState(false);
  const [name, setName] = useState("French");
  const [skillValue, setSkillValue] = useState();
  let selected = [];
  const [disabled, setDisabled] = useState(false);

  //snackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await userService.getNormalLang();
      setData(result.data);
      setSuccessful(false);
    };
    fetchData();
  }, [successful]);
  const upload = () => {
    const value = skillValue;
    userService.uploadNormalLang(name, value)
      .then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setMessage("Added");
          handleClick();
          setDisabled(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
  };
  const deleteById = (id) => {
    userService.deleteNormalLang(id)
      .then((response) => {
        setSuccessful(true);
        setMessage("Deleted!");
        handleClick();
        setSuccessful(false);
      });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const skillPicker = (e) => {
    setName(e.value);
    setDisabled(false);
  };

  const skValue = (value) => {
    setSkillValue(value);
  };

  const singleOption = ({ data }) => (
    <div className="input-select">
      <div className="input-select__single-value d-flex justify-content-center">
        <span style={{ fontSize: "1.5vw" }}>&nbsp;{data.label}</span>
      </div>
    </div>
  );

  return (
    <div className="container">
      <FormControl>
        <div className="form">
          <div className="form-group col-12">
            <label>Languages :</label>
            <Select
              defaultValue={statusOptions[0]}
              options={statusOptions}
              onChange={skillPicker}
              components={{ SingleValue: singleOption }}
              isOptionDisabled={(option) =>
                selected.indexOf(option.value) !== -1
              }
            />
          </div>
          <div className="col-10">
            <Typography id="discrete-slider" gutterBottom>
              Proficiency:
            </Typography>
            <Slider
              defaultValue={5}
              getAriaValueText={skValue}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={10}
            />
          </div>
          <div className="row col-md-10 justify-content-around">
            <div className="col-3">
              <Button
                onClick={upload}
                variant="outlined"
                color="primary"
                size="medium"
                disabled={disabled}
                startIcon={
                  <AddCircleOutlinedIcon
                    style={{
                      maxWidth: "30px",
                      maxHeight: "30px",
                      minWidth: "30px",
                      minHeight: "30px",
                    }}
                  />
                }
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </FormControl>
      <div className="responsive-table flex-fill">
        <table class="table">
          <thead>
            <th>Skill</th>
            <th>Proficiency</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {data?.map((lng) => (
              <tr className="mt-10">
                <td>{lng.name}</td>
                <td>{lng.value}</td>
                <td>
                  <IconButton aria-label="delete" className="pt-0">
                    <DeleteIcon
                      style={{ color: "#df4759" }}
                      className="pt-0"
                      onClick={() => {
                        setTimeout(deleteById(lng.id), 500);
                      }}
                    />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default SkillForm;
