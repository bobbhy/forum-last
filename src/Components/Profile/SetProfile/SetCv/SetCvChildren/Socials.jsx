import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { MDBContainer, MDBBtn } from "mdbreact";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Tooltip from "@material-ui/core/Tooltip";

const Socials = (props) => {
  const [id, setId] = useState("");
  const [toggle, setToggle] = useState(false);
  const [socials, setSocials] = useState({});

  const fbToggler = (e) => {
    if (toggle === false) {
      setToggle(true);
      setId("Facebook");
    } else {
      setId("Facebook");
    }
  };

  const inToggler = (e) => {
    if (toggle === false) {
      setToggle(true);
      setId("LinkedIn");
    } else {
      setId("LinkedIn");
    }
  };

  const gitToggler = (e) => {
    if (toggle === false) {
      setToggle(true);
      setId("GitHub");
    } else {
      setId("Github");
    }
  };

  const ytToggler = () => {
    if (!toggle) {
      setToggle(true);
      setId("YouTube");
    } else {
      setId("YouTube");
    }
  };

  const close = () => {
    setToggle(false);
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    if (e.target.id === "Facebook") {
      setSocials({ ...socials, Facebook: value });
    } else if (e.target.id === "LinkedIn") {
      setSocials({ ...socials, LinkedIn: value });
    } else if (e.target.id === "GitHub") {
      setSocials({ ...socials, GitHub: value });
    } else if (e.target.id === "YouTube") {
      setSocials({ ...socials, YouTube: value });
    }
  };

  return (
    <div>
      <div class="form-group row col-sm-12 align-items-center">
        <label class="col-sm-2 col-form-label">Add Socials:</label>
        <MDBContainer className="col-sm-10 flex-row mt-3">
          <Tooltip title="Lien pour votre profil Facebook">
            <MDBBtn
              size="lg"
              className="col-sm-3 col-4"
              social="fb"
              onClick={fbToggler}
            >
              <FacebookIcon />
            </MDBBtn>
          </Tooltip>
          <Tooltip title="Lien pour votre profil LinkedIn">
            <MDBBtn
              size="lg"
              className="col-sm-3 col-4"
              social="li"
              onClick={inToggler}
            >
              <LinkedInIcon />
            </MDBBtn>
          </Tooltip>
          <Tooltip title="Lien pour votre compte GitHub">
            <MDBBtn
              size="lg"
              className="col-sm-3 col-4"
              social="git"
              onClick={gitToggler}
            >
              <GitHubIcon />
            </MDBBtn>
          </Tooltip>
          <Tooltip title="Lien pour votre CV video">
            <MDBBtn
              size="lg"
              className="col-sm-3 col-4"
              social="git"
              onClick={ytToggler}
            >
              <YouTubeIcon />
            </MDBBtn>
          </Tooltip>
        </MDBContainer>
      </div>
      {toggle && (
        <div class="form-group" style={{ display: "flex" }}>
          {id && (
            <input
              class="form-control col-sm-8"
              type="text"
              placeholder={`${id} Link`}
              style={{ backgroundColor: "#f3f2ef" }}
              id={id}
              value={socials[id]}
              onChange={onChangeHandler}
              required
            />
          )}
          <Button
            variant="contained"
            color="info"
            style={{ marginLeft: "3px", fontWeight: "bolder" }}
            onClick={(event) => {
              props.onChange(socials);
              close();
            }}
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
};
export default Socials;