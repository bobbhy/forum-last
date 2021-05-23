import React, { useState, useEffect, initialstate } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import * as faceapi from "face-api.js"
import axios from "axios";
import userService from "../../../../../services/userService"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// import CvService from '/Users/Bobbhy/Documents/React/front/src/services/cv.service';

const Image = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = (e) => {
    fileUpload();
    setTimeout(setOpen(true), 500);
  };

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
  const [initializing, setInitializing] = useState(false)
  const [error, setError] = useState(false);
  useEffect(() => {
    if(props.image)
    {
      setImage(userService.imageLink+props.image)
      props.onChange(true);
    }
  }, [successful]);
  const onChange = async (e) => {
    setError(false)
    const myRenamedFile = new File(
      [e.target?.files[0]],
      props.id + "." + e.target?.files[0].type.split("/")[1]
    );
    setFile(myRenamedFile);
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(URL.createObjectURL(img));
      setTimeout(async () => {
        if (initializing) {
          const fr = document.getElementById("img")
          const detection = await faceapi.detectSingleFace(fr);
          if (!detection) {
            setError(false)
            setMessage("No Face Detected in this image");
            setSuccessful(false);
            setTimeout(setOpen(true), 500);
          }
          else {
            setError(true)
          }
        }
      }, 100);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const loadmodels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/Models';
      setInitializing(true)
      Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ])
    }
    loadmodels();
    setUser(user);
  }, []);

  const fileUpload = () => {
    const url = userService.uploadImageUrl;
    const formData = new FormData();
    formData.append("file", file);
    let value = "Bearer " + user?.accessToken;
    const config = {
      headers: {
        Authorization: value,
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config).then(
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
  };
  return (
    <form>
      <h2 className="text-center">Ajoutez votre photo de profil</h2>
      <p className="text-danger">Notez bien que cette photo doit etre professionelle et ne doit pas dépassé pas 1 Mb</p>
      {image && (
        <div>
          <img
            className="mx-auto d-block rounded border border-dark"
            src={image}
            id="img"
            style={{ maxHeight: "45vh", maxWidth: "50vw" }}
            alt="a"
          />
        </div>
      )}
      <div className="d-flex flex-row justify-content-around ">
        <div class="form-group mb-2">
          <label for="file-upload" className="btn btn-outline-dark mt-2 ">
            <i class="fas fa-upload"></i>Choisir Un fichier
          </label>
          <input
            type="file"
            id="file-upload"
            className="d-none"
            accept=".jpeg,.png,.jpg,.tif,.jfif"
            onChange={onChange}
          />
        </div>
        <div>
          <Button
            className="MuiButton-sizeSmall MuiButton-textPrimary mt-2"
            variant="outlined"
            disabled={!error ? true : false}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            UPLOAD
          </Button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
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
