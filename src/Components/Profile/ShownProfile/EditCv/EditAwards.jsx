import "date-fns";
import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import authHeader from "../../../../services/authHeader";
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
import userService from "../../../../services/userService";

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
    minWidth: "39vw",
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

const Award = (props) => {
  //POST STATES
  const [organizer, setOrganizer] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

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
      const result = await userService.getAward();
      setData(result.data);
    };
    fetchData();
  }, [successful]);

  const handleOrganizer = (e) => {
    setOrganizer(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePosition = (e) => {
    setPosition(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const upload = () => {
    const errors = [];
    if (organizer.length === 0) errors.push("Fields must not be empty.\n");
    if (name.length === 0) errors.push("Fields must not be empty.\n");
    if (!position.match("^[0-9]+$")) errors.push("Position must be a number.");
    if (errors.length !== 0) {
      setMessage(errors);
      setOpen(true);
      return 0;
    }
    // console.log(typeof parseInt(position));
    setModalShow(false);
    userService.uploadAward(organizer, name, position)
      .then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
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
    setOrganizer("");
    setName("");
    setPosition("");
  };

  const deleteById = (id) => {
    userService.deleteAward(id)
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
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <FormControl>
              <Grid container justify="center">
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    label="Organizer"
                    value={organizer}
                    onChange={handleOrganizer}
                    className={classes.textfield}
                  />
                  <TextField
                    variant="outlined"
                    label="Name"
                    value={name}
                    onChange={handleName}
                    className={classes.textfield}
                  />
                  <TextField
                    variant="outlined"
                    label="Position"
                    value={position}
                    onChange={handlePosition}
                    className={classes.textfield}
                  />
                </Grid>
              </Grid>
            </FormControl>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert severity="error">{message}</Alert>
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

        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Organizer</TableCell>
                <TableCell>Competition Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((obj) => (
                <TableRow key={obj}>
                  <TableCell component="th" scope="row">
                    {obj.organizer}
                  </TableCell>
                  <TableCell>{obj.name}</TableCell>
                  <TableCell>{obj.position}</TableCell>
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
      </div>
    </div>
  );
};
export default Award;
