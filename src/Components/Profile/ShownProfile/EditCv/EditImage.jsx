import React, { useState, useEffect, initialstate } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { post } from "axios";
import userService from "../../../../services/userService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// import CvService from '/Users/Bobbhy/Documents/React/front/src/services/cv.service';

const Image = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  const [successful, setSuccessful] = useState(initialstate);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    const myRenamedFile = new File(
      [e.target.files[0]],
      props?.data?.id + "." + e.target.files[0].type.split("/")[1]
    );
    setFile(myRenamedFile);

    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const fileUpload = () => {
    const url =
      props?.role === 3
        ? userService.uploadImageUrlCompany
        : userService.uploadImageUrl;
    const formData = new FormData();
    formData.append("file", file);
    let value = "Bearer " + user?.accessToken;
    const config = {
      headers: {
        Authorization: value,
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config).then(
      (response) => {
        window.location.reload();
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
        setOpen(true);
      }
    );
  };
  return (
    <form>
      <h2 className="text-center">
        {props?.role === 1
          ? "Edit your profile photo"
          : "Edit your company photo"}
      </h2>
      {image && (
        <div>
          <img
            className="mx-auto d-block rounded border border-dark"
            src={image}
            style={{ maxHeight: "45vh", maxWidth: "50vw" }}
            alt="a"
          />
        </div>
      )}
      <div className="d-flex flex-row justify-content-around ">
        <div class="form-group mb-2">
          <label for="file-upload" className="btn btn-outline-dark mt-2 ">
            <i class="fas fa-upload"></i>Choose File
          </label>
          <input
            type="file"
            id="file-upload"
            className="d-none"
            accept=".jpeg,.png,.jpg,.tif,.svg,.jfif"
            onChange={onChange}
          />
        </div>
        <div>
          <Button
            className="MuiButton-sizeSmall MuiButton-textPrimary mt-2"
            variant="outlined"
            onClick={(e) => {
              fileUpload();
            }}
          >
            Update
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={successful ? "success" : "error"}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </form>
  );
};
export default Image;
