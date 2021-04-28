import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useEffect, useState, initialState, useRef } from "react";
import "./Post.scss";
import PublicIcon from "@material-ui/icons/Public";
import InputOption from "../InputOption/InputOption";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";
import userService from "../../../../services/userService";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import authHeader from "../../../../services/authHeader";
import Comment from "./Comments/Comment/Comment";
import "./Comments/AddComment/AddComment.scss";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ModalB from "react-bootstrap/Modal";
import ModalImage from "react-modal-image";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import SendIcon from "@material-ui/icons/Send";

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
    width: theme.spacing(7),
    height: theme.spacing(7),
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

function Post({
  user,
  postId,
  message,
  timestamp,
  ownerId,
  role,
  username,
  currentUserId,
  ownerImage,
  imageType,
  onChange,
}) {
  const [input, setInput] = useState(message);
  const [owner, setOwner] = useState();
  const [commentInput, setCommentInput] = useState("");
  const classes = useStyles();
  const [comments, setComments] = useState([]);

  const [successful, setSuccessful] = useState(true);
  const [uploadMessage, setUploadMessage] = useState("");

  const [refresh, setRefresh] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [toggleLike, setToggleLike] = useState(false);
  const [shownLikes, setShownLikes] = useState(initialState);
  const [likes, setLikes] = useState(initialState);
  const [snackOpen, setSnackOpen] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

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

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const result = await axios.get("http://localhost:5000/api/cv/getPosts");
  //     setRes(result?.data);
  //     arrayForHoldingPosts = result?.data?.slice(0, 10);
  //     setPostsToShow(res?.slice(0, 10));
  //   };
  //   getPosts();
  // }, [refresh]);

  useEffect(() => {
    userService.getUserById(ownerId).then((response) => {
      setOwner(response?.data);
    });
    async function bzaf() {
      const result = await userService.getLikesByPost(postId);
      setLikes(result?.data);
      setShownLikes(result?.data?.length);
      setRefresh(true);
      for (let i = 0; i < result?.data?.length; i++) {
        if (user?.id === result?.data[i]?.likerId) {
          setToggleLike(true);
          break;
        }
      }
    }
    bzaf();
    userService.getPostComments(postId)
      .then((response) => {
        setComments(response?.data);
        setToggleComment(!toggleComment);
      });
    setToggleComment(!toggleComment); //problem here
  }, [refresh]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit your Post</h2>
      <p id="simple-modal-description">
        <textarea
          className="inputs form-control col-sm-12 mt-2"
          rows="4"
          maxLength="1000"
          placeholder="Post"
          style={{
            backgroundColor: "#f3f2ef",
            resize: "none",
          }}
          defaultValue={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <Button
          color="primary"
          onClick={() => {
            updatePost(postId);
          }}
        >
          Update
        </Button>
      </p>
      {/* <SimpleModal /> */}
    </div>
  );

  //modalconst [modalShow, setModalShow] = useState(false);

  // useEffect(() => {
  //   async function getImageById() {
  //     if (role === 1)
  //       await userService.getImageById(ownerId).then((response) => {
  //         setImaage(`data:image/png;base64,${response?.data}`);
  //       });
  //     else if (role === 3)
  //       await userService.getCompanyImageById(ownerId).then((response) => {
  //         setImaage(`data:image/png;base64,${response?.data}`);
  //       });
  //   }
  //   getImageById();
  // }, []);

  function MyVerticallyCenteredModal(props) {
    return (
      <ModalB
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="image_modal"
      >
        <ModalB.Body className="image_modal_body">
          <img
            className="post_image"
            onClick={() => setModalShow(true)}
            src={
              userService.imageLink +
              postId +
              "." +
              imageType
            }
          />
        </ModalB.Body>
      </ModalB>
    );
  }
  const deleteById = (id) => {
    userService.deletePostById(id).then((res) => {
      // window.location.reload();
      onChange(true);
      onChange(false);
    });
  };

  const updatePost = (id) => {
    const post = {
      message: input,
      role: user?.roles[0]?.id,
    };
    if (user?.roles[0]?.id === 1) {
      userService.updateStudentPost(id, post).then(
        (response) => {
          setSuccessful(true);
          setSnackOpen(true);
          setUploadMessage("Post Updated!");
          onChange(true);
          onChange(false);
          setOpen(false);
        },
        (error) => {
          setSuccessful(false);
          setSnackOpen(true);
          setUploadMessage("Could not update post!");
        }
      );
    } else if (user?.roles[0]?.id === 3) {
      userService.updateCompanyPost(id, post).then(
        (response) => {
          setSuccessful(true);
          setSnackOpen(true);
          setUploadMessage("Post Updated!");
          onChange(true);
          onChange(false);
          setOpen(false);
        },
        (error) => {
          setSuccessful(false);
          setSnackOpen(true);
          setUploadMessage("Could not update post!");
        }
      );
    }
  };

  const uploadComment = () => {
    const errors = [];
    if (commentInput.length === 0) errors.push("Comment cannot be empty.\n");
    if (errors.length !== 0) {
      setUploadMessage(errors);
      setSuccessful(false);
      setSnackOpen(true);
      return 0;
    }

    if (user?.roles[0]?.id === 1) {
      let comment = {
        message: commentInput,
        role: 1,
      }
      userService.uploadStudentComment(postId, comment)
        .then(
          (response) => {
            setRefresh(!refresh);
            setSnackOpen(true);
            setSuccessful(true);
            setCommentInput("");
            setUploadMessage("Comment uploaded!");
          },
          (error) => {
            setSuccessful(false);
            setSnackOpen(true);
            setUploadMessage("Could not upload comment!");
          }
        );
    } else if (user?.roles[0]?.id === 3) {
      let comment = {
        message: commentInput,
        role: 3,
      }
      userService.uploadCompanyComment
        .then((response) => {
          // window.location.reload();
          setRefresh(!refresh);
          setSnackOpen(true);
          setSuccessful(true);
          setCommentInput("");
          setUploadMessage("Message uploaded!");
        });
    }
  };

  const handleKeyDown = (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      uploadComment(postId);
    }
  };

  const likePost = (postId) => {
    userService.likePost(postId, user?.id)
      .then(
        (response) => {
          setToggleLike(true);
          setShownLikes(shownLikes + 1);
          // onChange(true);
          // onChange(false);
        },
        (error) => {
          setSuccessful(false);
          setUploadMessage("Couldn't like post!");
          setSnackOpen(true);
        }
      );
  };
  const unlikePost = (postId) => {
    userService.unlikePost(postId)
      .then(
        (response) => {
          setShownLikes(shownLikes - 1);
          setToggleLike(false);
        },
        (error) => {
          setSuccessful(false);
          setUploadMessage("404 Couldn't unlike post!");
          setSnackOpen(true);
        }
      );
  };

  return (
    // <div className="post_and_comment">
    <div className="post">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <div className="post_header">
        <Link to={`/view/${ownerId}`} style={{ textDecoration: "none" }}>
          {role === 1 && (
            <Avatar
              src={
                userService.imageLink + owner?.cv?.image
              }
              className={classes.large}
            />
          )}
          {role === 3 && (
            <Avatar
              variant="square"
              src={
                userService.imageLink +
                owner?.company?.companyImage
              }
              className={classes.large}
            />
          )}
          {/* <Avatar src={imaage} className={classes.large} /> */}
        </Link>
        <div className="post_info">
          <h2 style={{ display: "flex" }}>
            {role === 1 &&
              owner?.cv?.about?.firstName + " " + owner?.cv?.about?.lastName}
            {role === 3 && owner?.company?.aboutCompany?.name}
          </h2>
          <p>{`@${username}  - ${role === 1 ? "Student" : "Enterprise"}`}</p>
          <span></span>
          <div className="post_date">
            <h6 style={{ color: "#000" }}>{timestamp} &nbsp;</h6>
            <PublicIcon className="global" style={{ color: "#000" }} />
          </div>
        </div>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="post_body">
        <div className="post_message">{message}</div>

        {imageType && (
          <ModalImage
            className="post_image"
            small={
              userService.imageLink + "post" +
              postId +
              "." +
              imageType
            }
            large={
              userService.imageLink + "post" +
              postId +
              "." +
              imageType
            }
            alt=""
          />
        )}
      </div>
      <div className="post_stats">
        <p style={{ fontSize: "13px" }}>
          {shownLikes} likes&nbsp;&nbsp;-&nbsp;&nbsp;
          {comments?.length} comments
        </p>
      </div>
      <div className="post_buttons">
        {toggleLike && (
          <InputOption
            Icon={ThumbUpIcon}
            title="Like"
            color="blue"
            onClick={() => unlikePost(postId)}
          />
        )}{" "}
        {/* dislike */}
        {!toggleLike && (
          <InputOption
            Icon={ThumbUpAltOutlinedIcon}
            title="Like"
            color="blue"
            onClick={() => likePost(postId)}
          />
        )}
        {/* like */}
        <InputOption
          Icon={CommentIcon}
          title="Comment"
          color="green"
          onClick={() => setToggleComment(!toggleComment)}
        />
        {/* {currentUserId !== ownerId && (
            <InputOption Icon={ShareIcon} title="Share" color="purple" />
          )} */}
        {currentUserId === ownerId && (
          <>
            <InputOption
              Icon={EditTwoToneIcon}
              title="Edit"
              color="purple"
              onClick={handleOpen}
            />
            <InputOption
              Icon={DeleteTwoToneIcon}
              title="Delete"
              color="red"
              onClick={() => {
                deleteById(postId);
              }}
            />
          </>
        )}
      </div>

      {toggleComment && (
        <>
          {comments.length !== 0 && (
            <div className="comments-header">
              <h4>Comments</h4>
            </div>
          )}
          <div className="add-comment">
            <Avatar
              src={
                role === 1
                  ? userService.imageLink + ownerImage
                  : userService.imageLink + ownerImage
              }
              className={classes.large}
            />
            <textarea
              rows="2"
              className="add-text-area"
              placeholder="Add a comment"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            {/* <input
            type="text"
            // rows="4"
            className="add-text-area"
            placeholder="Add a comment"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyDown={handleKeyDown}
          /> */}
          </div>
          {commentInput && (
            <Button
              color="blue"
              variant="contained"
              className="toggleCommentButton"
              style={{ marginBottom: "10px" }}
              onClick={() => uploadComment(postId)}
            >
              Publier {<SendIcon />}
            </Button>
          )}
        </>
      )}
      {toggleComment &&
        comments?.map((e, key) => (
          <Comment
            key={key}
            onChange={() => {
              setRefresh(!refresh);
            }}
            refresh={refresh}
            user={user}
            commentId={e?.id}
            message={e?.message}
            timestamp={e?.updatedAt.substring(0, 10)}
            username={e?.ownerUsername}
            firstName={e?.ownerFirstName}
            lastName={e?.ownerLastName}
            companyName={e?.companyName}
            role={e?.role}
            ownerId={e?.ownersId}
            currentUserId={user?.id}
            likes={e?.likes}
            onChange={(value) => setRefresh(value)}
          />
        ))}
      <Snackbar
        open={snackOpen}
        autoHideDuration={1500}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleClose}
          severity={successful ? "success" : "error"}
        >
          {uploadMessage}
        </Alert>
      </Snackbar>
      {toggleComment && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            color="default"
            variant="outlined"
            className="toggleCommentButton"
            onClick={() => setToggleComment(!toggleComment)}
          >
            {<ExpandLessIcon />} Close
          </Button>
        </div>
      )}
    </div>
  );
}

export default Post;
