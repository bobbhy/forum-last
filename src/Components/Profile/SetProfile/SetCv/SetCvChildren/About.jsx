import React, { useState, initialState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Input from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import Socials from "./Socials";
import "../SetCv.css";
import Form from "react-bootstrap/Form";
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
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [fullAbout, setFullAbout] = useState();

  const handleClick = (e) => {
    const errors1 = [];
    if (firstName.length === 0 || lastName.length === 0)
      errors1.push("Name cannot be empty");
    // if (address.length === 0 || city.length === 0)
    //   errors1.push("Adrress cannot be empty");
    // if (!number) errors1.push("Number cannot be empty");
    // if (number?.length < 11)
    //   errors1.push("Your number should be like 0663-123123");
    if (bio?.length === 0) errors1.push("Bio must not be empty");
    // if (interests?.length === 0) errors1.push("Interests must not be empty");
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

  // DATA TO UPLOAD AL3ABD
  const [bio, setBio] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [interests, setInterests] = useState("");
  const [domaine, setDomaine] = useState("");
  const [gottenName, setGottenName] = useState("");

  // RESPONSE MESSAGE AL3ABD
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState(initialState);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

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

  const handleInterestsChange = (e) => {
    const value = e.target.value;
    setInterests(value);
  };

  const handleDomaineChange = (e) => {
    setDomaine(e.target.value);
  };

  const upload = (e) => {
    userService
      .uploadAbout(
        firstName,
        lastName,
        address,
        city,
        number,
        bio,
        interests,
        domaine
      )
      .then(
        (response) => {
          setMessage(response.data.message);
          props.onChange(true);
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

  useEffect(() => {
    userService.getUserData().then((res) => {
      setGottenName(res?.data?.name);
      setFirstName(
        res?.data?.name
          ?.split(" ")
          .slice(0, 1)
          ?.map((e) => e.charAt(0).toUpperCase() + e.slice(1))
          .join(" ")
      );
      setLastName(
        res?.data?.name
          ?.split(" ")
          ?.slice(1)
          ?.map((e) => e.charAt(0).toUpperCase() + e.slice(1))
          .join(" ")
      );
    });
  }, []);

  return (
    <div className={classes.route}>
      <form>
        <div className="form-group row align-items-center">
          <label for="number" className="col-sm-2  col-form-label">
            Full Name:
          </label>
          <div className="col-sm-5 mt-2 ">
            <input
              className="form-control mr-2"
              style={{
                backgroundColor: "#f3f2ef",
              }}
              type="text"
              placeholder="First Name"
              defaultValue={firstName}
              value={firstName
                .split(" ")
                .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                .join(" ")}
              onChange={handleFirstNameChange}
              required
            />
          </div>
          <div className="col-sm-5 mt-2">
            <input
              className="form-control mr-2"
              style={{
                backgroundColor: "#f3f2ef",
              }}
              type="text"
              id="number"
              placeholder="Last Name"
              defaultValue={lastName}
              value={lastName
                .split(" ")
                .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                .join(" ")}
              onChange={handleLastNameChange}
              required
            />
          </div>
        </div>
        <div className="form-group row align-items-center">
          <label for="number" className="col-sm-2 col-form-label">
            Address:
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

        <div className="form-group row align-items-center">
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
        <div className="form-group row align-items-center">
          <label for="example-tel-input" class="col-sm-2 col-form-label">
            Filiere :
          </label>
          <div className="col-sm-5">
            <Form.Control as="select" onChange={handleDomaineChange}>
              <option value="Informatique">Informatique</option>
              <option value="Electrique">Electrique</option>
              <option value="Mécanique">Mécanique</option>
              <option value="Industriel">Industriel</option>
              <option value="Réseau et Télecommunications">
                Réseau et Télecommunications
              </option>
              <option value="Economie">Economie</option>
              <option value="Autre">Autre</option>
            </Form.Control>
          </div>
        </div>
        <div class="form-group">
          <label for="bio" class="col-sm-2 col-form-label">
            Bio:
          </label>
          <br />
          <textarea
            className="inputs form-control col-sm-12 mt-2"
            rows="4"
            name="bio"
            id="comment"
            maxLength="800"
            placeholder="Bio"
            style={{
              backgroundColor: "#f3f2ef",
              resize: "none",
            }}
            value={bio}
            onChange={handleBioChange}
          ></textarea>
        </div>
        <div class="form-group">
          <label for="interests" class="col-sm-2 col-form-label">
            Interests:
          </label>
          <br />
          <textarea
            className="inputs form-control col-sm-12"
            rows="4"
            name="interests"
            id="comment"
            maxLength="800"
            placeholder="What interests you?"
            style={{
              backgroundColor: "#f3f2ef",
              resize: "none",
            }}
            value={interests}
            onChange={handleInterestsChange}
          ></textarea>
        </div>
        <Socials />
        <div className={classes.root + " btnholder"}>
          <Button
            variant="outlined"
            onClick={(e) => {
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
