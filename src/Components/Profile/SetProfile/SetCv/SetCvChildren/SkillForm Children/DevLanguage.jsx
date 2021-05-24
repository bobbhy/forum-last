import React, { useState, useEffect, initialState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from "react-select";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import authHeader from "../../../../../../services/authHeader";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import userService from "../../../../../../services/userService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const statusOptions = [
  { value: "HTML5", label: "HTML5", icon: "fab fa-html5" },
  { value: "CSS3", label: "CSS3", icon: "fab fa-css3-alt" },
  { value: "Java", label: "Java", icon: "fab fa-java" },
  { value: "JavaScript", label: "JavaScript", icon: "fab fa-js-square" },
  { value: "PHP", label: "PHP", icon: "fab fa-php" },
  { value: "Laravel", label: "Laravel", icon: "fab fa-laravel" },
  { value: "Python", label: "Python", icon: "fab fa-python" },
  { value: "Angular", label: "Angular", icon: "fab fa-angular" },
  { value: "ReactJS", label: "ReactJS", icon: "fab fa-react" },
  { value: "Autre", label: "Autre" },
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
  const [data, setData] = useState();
  const [successful, setSuccessful] = useState(false);
  const [name, setName] = useState("HTML5");
  const [skillValue, setSkillValue] = useState();
  const [isOther, setIsOther] = useState(false);
  const [icon, setIcon] = useState("fab fa-html5 fa-2x");
  let selected = [];
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(initialState);
  const [id, setId] = useState();

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await userService.getDevLang();
      setData(result.data);
      setSuccessful(false);
    };
    fetchData();
    async function getUserData() {
      await userService.getUserData().then((response) => {
        setFlag(response?.data?.cv?.flag);
        setId(response?.data?.id);
      });
    }
    getUserData();
  }, [successful]);

  const upload = () => {
    const value = skillValue;
    userService.uploadDevLang(name, value, icon).then(
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
    userService.deleteDevLang(id).then((response) => {
      setSuccessful(true);
      setMessage("Deleted!");
      handleClick();
      setSuccessful(false);
    });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
    setIcon(" ");
    setDisabled(false);
  };
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const skillPicker = (e) => {
    if (e.value == "Autre") {
      setIsOther(true);
    } else {
      setIsOther(false);
      setName(e.value);
      setIcon(e.icon);
      setDisabled(false);
    }
  };

  const skValue = (value) => {
    setSkillValue(value);
  };
  const singleOption = ({ data }) => (
    <div className="input-select">
      <div className="input-select__single-value d-flex justify-content-center">
        <i className={data.icon + " fa-2x"} />
        &nbsp; &nbsp;
        <span style={{ fontSize: "18px" }}>&nbsp;{data.label}</span>
      </div>
    </div>
  );

  return (
    <div className="container d-flex flex-row">
      <FormControl className="col-5">
        <div className="form">
          <div className="form-group col-md-10 ">
            <label>Developing Skills :</label>
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
          {isOther && (
            <div className="col-md-10 mb-3">
              <TextField
                id="standard-basic"
                label="Your Other Skill"
                required
                onChange={handleChange}
              />
            </div>
          )}
          <div className="col-md-10">
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
                onClick={() => {
                  upload();
                }}
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
            <th>Language</th>
            <th>Proficiency</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {data?.map((dev) => (
              <tr className="mt-10">
                <td>
                  {dev.icon == " " ? (
                    <>
                      <i class={`${dev.icon} fa-x`} />{" "}
                    </>
                  ) : (
                    <>
                      <i class={`${dev.icon} fa-2x`} />{" "}
                    </>
                  )}
                  <span style={{ fontSize: "18px" }}>{dev.name}</span>
                </td>
                <td>
                  <span style={{ fontSize: "18px" }}>{dev.value}</span>
                </td>
                <td>
                  <IconButton aria-label="delete" className="pt-0">
                    <DeleteIcon
                      className="pt-0"
                      style={{ color: "#df4759" }}
                      onClick={() => {
                        setTimeout(deleteById(dev.id), 500);
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
