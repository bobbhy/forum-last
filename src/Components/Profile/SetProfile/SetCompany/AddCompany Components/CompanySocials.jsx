import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { MDBIcon, MDBContainer, MDBBtn } from "mdbreact";

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

  const webToggler = (e) => {
    if (toggle === false) {
      setToggle(true);
      setId("Website");
    } else {
      setId("Website");
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
    } else if (e.target.id === "Website") {
      setSocials({ ...socials, Website: value });
    }
  };

  return (
    <div cls>
      <div class="form-group row col-sm-12">
        <label class="col-sm-2 col-form-label">Add Socials:</label>
        <MDBContainer className="col-sm-10 flex-row mt-3">
          <MDBBtn
            size="lg"
            className="col-sm-3 col-4"
            social="fb"
            onClick={fbToggler}
          >
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn
            size="lg"
            className="col-sm-3 col-4"
            social="li"
            onClick={webToggler}
          >
            <MDBIcon icon="globe" />
          </MDBBtn>

          <MDBBtn
            size="lg"
            className="col-sm-3 col-4"
            social="li"
            onClick={inToggler}
          >
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>
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
