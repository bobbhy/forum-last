import React, { useState, useEffect } from "react";
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
import authHeader from "../../../../services/authHeader";
import axios from "axios";
import userService from "../../../../services/userService";

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
  // const classes = useStyles();
  const [data, setData] = useState();
  const [successful, setSuccessful] = useState(false);
  const [name, setName] = useState("HTML5");
  const [skillValue, setSkillValue] = useState();
  const [icon, setIcon] = useState("fab fa-html5 fa-3x");
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
      const result = await userService.getDevLang()
      setData(result.data);
      setSuccessful(false);
    };
    fetchData();
  }, [successful]);
  const upload = () => {
    const value = skillValue;
    userService.uploadDevLang(name, value, icon)
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
    userService.deleteDevLang(id).then((response) => {
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
    setIcon(e.icon);
    setDisabled(false);
  };

  const skValue = (value) => {
    setSkillValue(value);
  };
  const singleOption = ({ data }) => (
    <div className="input-select">
      <div className="input-select__single-value d-flex justify-content-center">
        <i className={data.icon + " fa-2x"} />
        &nbsp; &nbsp;
        <span style={{ fontSize: "1.5vw" }}>&nbsp;{data.label}</span>
      </div>
    </div>
  );

  return (
    <div className="container">
      <FormControl className="w-100">
        <div className="form">
          <div className="form-group col-12">
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
          <div className="col-md-12">
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
            <div className="col-2 mb-2">
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
      <div className="responsive-table flex-fill row">
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
                  <i class={`${dev.icon} fa-3x`} />{" "}
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
