import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { MDBContainer, MDBBtn } from "mdbreact";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Tooltip from "@material-ui/core/Tooltip";
import userService from "../../../../services/userService";
const Socials = (props) => {
  const [id, setId] = useState("");
  const [toggle, setToggle] = useState(false);
  const [url, setUrl] = useState("");

  const fbToggler = (e) => {
    setId("Facebook");
    if (!toggle) {
      setToggle(true);
    } else {
      if (id == "Facebook") {
        setToggle(false);
        setId("Facebook");
      }
    }
  };

  const inToggler = (e) => {
    setId("LinkedIn");
    if (!toggle) {
      setToggle(true);
    } else {
      if (id == "LinkedIn") {
        setId("LinkedIn");
        setToggle(false);
      }
    }
  };

  const gitToggler = (e) => {
    setId("GitHub");
    if (!toggle) {
      setToggle(true);
    } else {
      if (id == "GitHub") {
        setToggle(false);
        setId("GitHub");
      }
    }
  };

  const ytToggler = () => {
    setId("YouTube");
    if (!toggle) {
      setToggle(true);
    } else {
      if (id == "YouTube") {
        setToggle(false);
        setId("YouTube");
      }
    }
  };

  const onChangeHandler = (e) => {
    setUrl(e.target.value);
  };

  const upload = () => {
    let ur = url;
    if(!url.startsWith("https://")){
        ur = "https://" + url
    }
    const link = { name: id, url: ur };
    userService.uploadCvLink(link).then(
      (res) => {
        setId("");
        setUrl("");
        setToggle(false);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
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
              placeholder={`Lien ${id}`}
              style={{ backgroundColor: "#f3f2ef" }}
              id={id}
              value={url}
              onChange={onChangeHandler}
              required
            />
          )}
          <Button
            variant="contained"
            color="info"
            style={{ marginLeft: "3px", fontWeight: "bolder" }}
            onClick={() => {
              upload();
            }}
          >
            Modifier
          </Button>
        </div>
      )}
    </div>
  );
};
export default Socials;
