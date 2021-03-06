import React, { useState, initialState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
// import "../../css/cv.css";
import Input from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import CompanySocials from "./CompanySocials";
import axios from "axios";
import authHeader from "../../../../../services/authHeader";
import userService from "../../../../../services/userService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  route: {
    width: "55%",
  },
}));

const About = (props) => {
  // MATERIAL UI STYLING AL3ABD
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    const errors1 = [];
    if (address.length === 0 || city.length === 0)
      errors1.push("Adrress cannot be empty");
    if (!number) errors1.push("Number cannot be empty");
    if (number?.length < 11)
      errors1.push("Your number should be like 0663-123123");
    if (bio?.length === 0) errors1.push("Bio must not be empty");
    if (errors1.length > 0) {
      setMessage(errors1);
      setTimeout(setOpen(true), 500);
      return 0;
    }
    upload(e);
    setTimeout(setOpen(true), 500);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setSuccessful(false);
  };

  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [social, setSocials] = useState({});

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState(initialState);

  const [flag, setFlag] = useState(initialState);
  const [id, setId] = useState();

  useEffect(() => {
    async function getUserData() {
      await userService.getUserData().then((response) => {
        setFlag(response?.data?.cv?.flag);
        setId(response?.data?.id);
      });
    }
    getUserData();
  }, []);

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleNumberChange = (e) => {
    const value = e;
    setNumber(value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const upload = (e) => {
    const socials = JSON.stringify(social);
    userService.uploadAboutCompany(
      address,
      city,
      number,
      bio,
      socials).then(
        (response) => {
          if (!flag) {
            userService.flagCompany(id)
          }
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
  };

  return (
    <div className={classes.route}>
      <form>
        <div className="form-group row">
          <label for="number" className="col-sm-2 col-form-label">
            Enterprise location:
          </label>
          <div className="col-sm-8">
            {" "}
            <input
              className="form-control mr-2 mt-2"
              style={{
                backgroundColor: "#f3f2ef",
              }}
              type="text"
              placeholder="Address"
              value={address}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="col-sm-2">
            <input
              className="form-control mr-2 mt-2"
              style={{
                backgroundColor: "#f3f2ef",
              }}
              type="text"
              placeholder="City"
              value={city}
              onChange={handleCityChange}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label for="example-tel-input" class="col-sm-2 col-form-label">
            Telephone :
          </label>
          <div className="col-sm-5">
            <Input
              className="form-control mt-2"
              country="MA"
              style={{
                backgroundColor: "#f3f2ef",
              }}
              value={number}
              placeholder="Number"
              onChange={handleNumberChange}
              id="example-tel-input"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="bio" class="col-sm-2 col-form-label">
            Enterprise Bio:
          </label>
          <br />
          <textarea
            className="inputs form-control col-sm-12 mt-2"
            rows="4"
            name="bio"
            id="comment"
            maxLength="400"
            placeholder="Bio"
            style={{
              backgroundColor: "#f3f2ef",
              resize: "none",
            }}
            value={bio}
            onChange={handleBioChange}
          ></textarea>
        </div>
        <CompanySocials onChange={(value) => setSocials(value)} />
        <div className={classes.root + " btnholder"}>
          <Button
            variant="outlined"
            onClick={(e) => {
              props.onChange(true);
              handleClick();
            }}
          >
            UPLOAD
          </Button>
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
        </div>
      </form>
    </div>
  );
};
export default About;
