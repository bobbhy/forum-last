import React, { useState, useEffect, initialState } from "react";
import { Link } from "react-router-dom";
import "./Comment.scss";
import Button from "@material-ui/core/Button";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import userService from "../../../../../../services/userService";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import authHeader from "../../../../../../services/authHeader";
import { set } from "date-fns";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    marginRight: "10px",
  },
  paper: {
    position: "absolute",
    width: "70vw",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Comment({
  ownerImage,
  onChange,
  refresh,
  user,
  message,
  commentId,
  timestamp,
  firstName,
  lastName,
  role,
  ownerId,
  likes,
  currentUserId,
}) {
  const [image, setImage] = useState("");
  const [input, setInput] = useState(message);
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [successful, setSuccessful] = useState(true);
  const [updateMessage, setUpdateMessage] = useState("");
  const [toggleLike, setToggleLike] = useState(false);
  const [shownLikes, setShownLikes] = useState(likes?.length);
  const [hh, setHh] = useState(false);

  const [snackOpen, setSnackOpen] = useState(false);
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteById = (id) => {
    userService.deleteComment(id).then(
      (response) => {
        onChange(true);
        onChange(false);
        setHh(!hh);
        setUpdateMessage("Comment deleted!");
        setSuccessful(true);
        setSnackOpen(true);
      },
      (error) => {
        setUpdateMessage("Couldn't delete comment!");
        setSuccessful(false);
        setSnackOpen(true);
      }
    );
  };

  const updateComment = (id) => {
    const errors = [];
    if (input.length === 0) errors.push("Comment cannot be empty.\n");
    if (errors.length !== 0) {
      setUpdateMessage(errors);
      setSuccessful(false);
      setSnackOpen(true);
      return 0;
    }
    const comment = {
      message: input,
      role: user?.roles[0]?.id,
    };
    if (user?.roles[0]?.id === 1) {
      userService.updateStudentComment(id, comment).then(
        (response) => {
          onChange(!refresh);
          setSuccessful(true);
          setSnackOpen(true);
          setInput("");
          setUpdateMessage("Comment updated successfully!");
          setOpen(false);
        },
        (error) => {
          setUpdateMessage("Couldn't update comment!");
          setSuccessful(false);
          setSnackOpen(true);
        }
      );
    } else if (user?.roles[0]?.id === 3) {
      userService.updateCompanyComment(id, comment).then(
        (response) => {
          onChange(!refresh);
          setSuccessful(true);
          setSnackOpen(true);
          setInput("");
          setUpdateMessage("Comment updated successfully!");
          setOpen(false);
        },
        (error) => {
          setUpdateMessage("Couldn't update comment!");
          setSuccessful(false);
          setSnackOpen(true);
        }
      );
    }
  };

  const likeComment = (commentId) => {
    userService.likeComment(commentId, user?.id).then(
      (response) => {
        setToggleLike(!toggleLike);
        setShownLikes(shownLikes + 1);
        // onChange(true);
        // onChange(false);
      },
      (error) => {
        setSuccessful(false);
        setUpdateMessage("Couldn't like post!");
        setSnackOpen(true);
      }
    );
  };
  const unlikeComment = (commentId) => {
    userService.unlikeComment(commentId).then(
      (response) => {
        setToggleLike(!toggleLike);
        // onChange(true);
        // onChange(false);
        setShownLikes(shownLikes - 1);
      },
      (error) => {
        setSuccessful(false);
        setUpdateMessage("Couldn't unlike comment");
        setSnackOpen(true);
      }
    );
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit your Post</h2>
      <p id="simple-modal-description">
        <textarea
          className="inputs form-control col-sm-12 mt-2"
          rows="4"
          maxLength="1000"
          placeholder="Editing Comment"
          style={{
            backgroundColor: "#f3f2ef",
            resize: "none",
          }}
          defaultValue={message}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <Button
          color="primary"
          onClick={() => {
            updateComment(commentId);
          }}
        >
          Update
        </Button>
      </p>
      {/* <SimpleModal /> */}
    </div>
  );

  useEffect(() => {
    const checkLiked = async () => {
      for await (let e of likes) {
        if (user?.id == e.likerId) {
          setToggleLike(true);
          break;
        }
      }
    };
    checkLiked();
  }, []);

  useEffect(() => {
    async function getImageById() {
      if (role === 1)
        await userService.getImageById(ownerId).then((response) => {
          setImage(`data:image/png;base64,${response?.data}`);
        });
      else if (role === 3)
        await userService.getCompanyImageById(ownerId).then((response) => {
          setImage(`data:image/png;base64,${response?.data}`);
        });
    }
    getImageById();
  }, []);

  return (
    <>
      <div className="comment">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        <Link to={`/view/${ownerId}`} style={{ textDecoration: "none" }}>
          {role === 1 && (
            <Avatar
              src={userService.imageLink + ownerImage}
              className={classes.large}
            />
          )}
          {role === 3 && (
            <Avatar
              src={userService.imageLink + ownerImage}
              variant="square"
              className={classes.large}
            />
          )}
        </Link>
        <div>
          <div className="user-name">
            {role === 1 && firstName + " " + lastName}
            {role === 3 &&
              firstName
                .split(" ")
                .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                .join(" ") +
                " - " +
                lastName}
          </div>
          <p className="comment-timestamp">{timestamp}</p>
          <span className="message">{message}</span>
          <div className="comment-actions">
            <Tooltip title="Like">
              <IconButton
                aria-label="edit"
                onClick={() => setToggleLike(!toggleLike)}
              >
                {!toggleLike && (
                  <ThumbUpOutlinedIcon onClick={() => likeComment(commentId)} />
                )}
                {toggleLike && (
                  <ThumbUpIcon
                    color="primary"
                    onClick={() => unlikeComment(commentId)}
                  />
                )}
              </IconButton>
            </Tooltip>
            <span style={{ fontSize: "12px" }}>{shownLikes}</span>
            {currentUserId === ownerId && (
              <>
                <Tooltip title="Edit">
                  <IconButton aria-label="edit" onClick={handleOpen}>
                    <EditTwoToneIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      deleteById(commentId);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
        </div>
        <Snackbar
          open={snackOpen}
          autoHideDuration={1500}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleClose}
            severity={successful ? "success" : "error"}
          >
            {updateMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
