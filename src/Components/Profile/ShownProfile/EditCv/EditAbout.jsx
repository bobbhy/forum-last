import React, { useState, initialState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Input from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import userService from "../../../../services/userService";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  route: {
    width: "100%",
  },
}));

const EditAbout = (props) => {
  // MATERIAL UI STYLING AL3ABD
  const classes = useStyles();
  const data = props.data;

  const handleClick = (e) => {
    const errors1 = [];
    if (firstName.length === 0 || lastName.length === 0)
      errors1.push("Name cannot be empty");
    if (address.length === 0 || city.length === 0)
      errors1.push("Adrress cannot be empty");
    if (!number) errors1.push("Number cannot be empty");
    if (number?.length < 11)
      errors1.push("Your number should be like 0663-123123");
    if (bio?.length === 0) errors1.push("Bio must not be empty");
    if (interests?.length === 0) errors1.push("Interests must not be empty");
    if (errors1.length > 0) {
      setMessage(errors1);
      return 0;
    }
    update(e);
  };

  const [bio, setBio] = useState(data?.bio);
  const [firstName, setFirstName] = useState(data?.firstName);
  const [lastName, setLastName] = useState(data?.lastName);
  const [address, setAddress] = useState(data?.address);
  const [city, setCity] = useState(data?.city);
  const [number, setNumber] = useState(data?.number);
  const [interests, setInterests] = useState(data?.interests);
  const [domaine, setDomaine] = useState(data?.domaine);

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

  const update = (e) => {
    let abut = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      number: number,
      bio: bio,
      interests: interests,
      domaine: domaine,
    };
    console.log(abut);
    userService.updateAbout(props?.id, abut)
      .then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(!props.toggle);
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
  };

  return (
    <div className="container">
      <form>
        <div className="form-group row align-items-center">
          <label for="number" className="col-1  col-form-label">
            Full Name:
          </label>
          <div className="col-5 mt-2 mr-5">
            <input
              className="form-control"
              style={{
                backgroundColor: "#f3f2ef",
              }}
              type="text"
              placeholder="First Name"
              value={firstName
                .split(" ")
                .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                .join(" ")}
              onChange={handleFirstNameChange}
              required
            />
          </div>
          <div className="col-4 mt-2">
            <input
              className="form-control"
              style={{
                backgroundColor: "#f3f2ef",
              }}
              type="text"
              id="number"
              placeholder="Last Name"
              value={lastName
                .split(" ")
                .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                .join(" ")}
              onChange={handleLastNameChange}
              required
            />
          </div>
        </div>
        <div className="form-group row  align-items-center">
          <label for="number" className="col-1 col-form-label">
            Address:
          </label>
          <div className="col-7 mr-2">
            {" "}
            <input
              className="form-control mt-2"
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
          <div className="col-3">
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
        <div className="form-group row  align-items-center">
          <label for="example-tel-input" class="col-3 col-form-label">
            Telephone :
          </label>
          <div className="col-5">
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
            Votre domaine d'étude :
          </label>
          <div className="col-sm-5">
            <Form.Control
              as="select"
              onChange={handleDomaineChange}
              defaultValue={domaine}
            >
              <option value="Informatique">Informatique</option>
              <option value="Electrique">Electrique</option>
              <option value="Mécanique">Mécanique</option>
              <option value="Economie">Economie</option>
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
        <div class="form-group">
          <label for="bio" class="col-sm-2 col-form-label">
            Interests:
          </label>
          <br />
          <textarea
            className="inputs form-control col-sm-12"
            rows="4"
            name="bio"
            id="comment"
            maxLength="400"
            placeholder="What interests you?"
            style={{
              backgroundColor: "#f3f2ef",
              resize: "none",
            }}
            value={interests}
            onChange={handleInterestsChange}
          ></textarea>
        </div>
        <div className={classes.root + " btnholder"}>
          <Button
            variant="outlined"
            onClick={(e) => {
              handleClick();
            }}
          >
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EditAbout;