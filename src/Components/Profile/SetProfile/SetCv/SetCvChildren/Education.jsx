import "date-fns";
import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import authHeader from "../../../../../services/authHeader";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import userService from "../../../../../services/userService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  textfield: {
    marginTop: "10px",
    marginRight: "1vw",
    width: "100%",
  },
  table: {
    minWidth: "60vw",
  },
  dates: {
    paddingTop: "10px",
    marginLeft: "2vw",
    width: "60%",
    outline: "none",
  },
  checkbox:
  {
    paddingTop: "40px",
    marginLeft: "5px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: "1vw 1vh",
    justifyContent: "center",
    outline: "none",
  },
}));

const FormModal = (props) => {
  //POST STATES
  let [dateStart, setStartDate] = useState(new Date());
  let [dateEnd, setEndDate] = useState(new Date());
  const [school, setSchool] = useState("");
  const [diploma, setDiploma] = useState("");
  const [field, setField] = useState("");
  const [checked, setChecked] = useState(false)

  // STYLE STATES
  const [open, setOpen] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  // RESPONSE STATES
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState();

  //MAKESTYLES
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const result = await userService.getEducation();
      if (result.data.length != 0) {
        props.onChange(true)
      }
      setData(result.data);
    };
    fetchData();
  }, [successful]);

  const handleStart = (date) => {
    setStartDate(date);
  };
  const handleChecked = (e) => {
    setChecked(!checked)
  }
  const handleEnd = (date) => {
    setEndDate(date);
  };

  const handleSchool = (e) => {
    setSchool(e.target.value);
  };
  const handleDiploma = (e) => {
    setDiploma(e.target.value);
  };
  const handleField = (e) => {
    setField(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const upload = () => {
    const errors = [];
    if (school.length === 0) errors.push("School must not be empty");

    if (dateEnd <= dateStart && !checked) {
      errors.push("End date can't be inferior or equal to start date!");
    }
    if (diploma.length === 0) errors.push("Diploma must not be empty");
    if (field.length === 0) errors.push("field must not be emepty");
    if (errors.length !== 0) {
      setMessage(errors);
      setOpen(true);
      return 0;
    }
    setModalShow(false);
    dateStart = dateStart.toString().substring(4, 15);
    if (checked) {
      dateEnd = "Present"
    }
    else {
      dateEnd = dateEnd.toString().substring(4, 15);
    }
    console.log(dateEnd)
    setChecked(false)

    userService.uploadEducation(school, diploma, dateStart, dateEnd, field)
      .then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          props.onChange(true);
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
    setSchool("");
    setDiploma("");
    setField("");
    setStartDate(new Date());
    setEndDate(new Date());
  };
  const deleteById = (id) => {
    userService.deleteEducation(id)
      .then((response) => {
        setSuccessful(true);
        setSuccessful(false);
      });
  };

  return (
    <div>
      <div className={classes.root}>
        <Button
          onClick={() => setModalShow(true)}
          variant="outlined"
          color="primary"
          size="medium"
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
          Add New
        </Button>
        <Modal
          show={modalShow}
          color="primary"
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <FormControl>
              <Grid container justify="space-between">
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    label="School"
                    value={school}
                    onChange={handleSchool}
                    className={classes.textfield}
                  />
                  <TextField
                    variant="outlined"
                    label="Diploma"
                    value={diploma}
                    onChange={handleDiploma}
                    className={classes.textfield}
                  />
                  <TextField
                    variant="outlined"
                    label="Field"
                    value={field}
                    onChange={handleField}
                    className={classes.textfield}
                  />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={6}>
                    <KeyboardDatePicker
                      disableToolbar
                      className={classes.dates}
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      label="Start Date"
                      value={dateStart}
                      onChange={handleStart}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                    <KeyboardDatePicker
                      disabled={checked ? true : false}
                      disableToolbar
                      className={classes.dates}
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      label="End Date"
                      value={dateEnd}
                      onChange={handleEnd}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                    <FormControlLabel
                      className={classes.checkbox}
                      value="end"
                      control={<Checkbox checked={checked}
                        onChange={handleChecked} color="primary" />}
                      label="Present"
                      labelPlacement="end"
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
            </FormControl>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={successful ? "success" : "error"}
              >
                {typeof message == "string"
                  ? message
                  : message?.map((message1) => (
                    <span>
                      -{message1}
                      <br />
                    </span>
                  ))}
              </Alert>
            </Snackbar>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                upload();
                setSuccessful(false);
              }}
            >
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
        {data && (
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>School</TableCell>
                  <TableCell>Diploma</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Field</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((obj) => (
                  <TableRow key={obj}>
                    <TableCell component="th" scope="row">
                      {obj.school}
                    </TableCell>
                    <TableCell>{obj.diploma}</TableCell>
                    <TableCell>{obj.dateStart}</TableCell>
                    <TableCell>{obj.dateEnd}</TableCell>
                    <TableCell>{obj.field}</TableCell>

                    <TableCell>
                      <IconButton aria-label="delete">
                        <DeleteIcon
                          style={{ color: "#df4759" }}
                          onClick={() => {
                            setTimeout(deleteById(obj.id), 500);
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};
export default FormModal;
