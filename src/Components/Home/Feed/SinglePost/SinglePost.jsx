import { Avatar, setRef } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useEffect, useState, initialState } from "react";
import "./SinglePost.scss";
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
import Comment from "../Post/Comments/Comment/Comment";
import "../Post/Comments/AddComment/AddComment.scss";
import { useParams } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import ModalImage from "react-modal-image";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import Loader from "react-loader-spinner";

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

export default function SinglePost(props) {
  const classes = useStyles();
  const { postId } = useParams();
  const [toggleLike, setToggleLike] = useState(false);
  const [shownLikes, setShownLikes] = useState(initialState);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [owner, setOwner] = useState(initialState);
  const [toggleComment, setToggleComment] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(initialState);
  // const postId = props?.match?.params?.postId;
  const [input, setInput] = useState();
  const [user, setUser] = useState(initialState);
  const [userImage, setUserImage] = useState(initialState);
  const [ownerId, setOwnerId] = useState();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timestamp, setTimestamp] = useState();
  const [role, setRole] = useState();
  const [username, setUsername] = useState();
  const [ownerImage, setOwnerImage] = useState("");
  const [imageType, setImageType] = useState();
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [likes, setLikes] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const loadingSpinner = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadingSpinner();
    async function getUserById() {
      await userService.getUserById(ownerId).then((response) => {
        console.log(response?.data);
        setOwner(response?.data);
        setUsername(response?.data?.username);
      });
    }
    async function getLikesByPost() {
      const result = await userService.getLikesByPost(postId);
      setLikes(result?.data);
      setShownLikes(result?.data?.length);
      setRefresh(true);
      for (let i = 0; i < result?.data?.length; i++) {
        if (user?.id == result?.data[i]?.likerId) {
          setToggleLike(true);
          break;
        }
      }
    }
    async function getPostById() {
      await userService.getPostById(postId).then(
        (response) => {
          setInput(response?.data?.message);
          setOwnerId(response?.data?.ownersId);
          setTimestamp(response?.data?.updatedAt);
          setRole(response?.data?.role);
          setMessage(response?.data?.message);
          setOwnerImage(response?.data?.ownerImage);
          setImageType(response?.data?.imageType);
          setComments(response?.data?.comment);
        },
        (error) => {
          setErrorMessage("Ce poste a été supprimé");
        }
      );
    }
    async function getUserData() {
      await userService.getUserData().then((response) => {
        setUser(response?.data);
        setCurrentUserId(response?.data?.id);
        if (response?.data?.roles[0]?.id === 1) {
          setUserImage(response?.data?.cv?.image);
        } else if (response?.data?.roles[0]?.id === 3) {
          setUserImage(response?.data?.company?.companyImage);
        }
      });
    }
    getUserData();
    getUserById();
    getPostById();
    getLikesByPost();
  }, [refresh, count]);
  const doReload = () => {
    setCount(count + 1);
    console.log("ok");
  };

  const deleteById = (id) => {
    userService.deletePostById(id).then((response) => {
      setRefresh(!refresh);
    });
  };

  const updatePost = (id) => {
    const post = {
      message: input,
      role: user?.roles[0]?.id,
    };
    if (user?.roles[0]?.id === 1) {
      userService.updateStudentPost(id, post).then((response) => {
        setOpen(false);
        setRefresh(true);
        setRefresh(false);
      });
    } else if (user?.roles[0]?.id === 3) {
      userService.updateCompanyPost(id, post).then((response) => {
        setOpen(false);
        setRefresh(true);
        setRefresh(false);
      });
    }
  };

  const uploadComment = (id) => {
    const errors = [];
    if (commentInput.length === 0) errors.push("Comment cannot be empty.\n");
    if (errors.length !== 0) {
      return 0;
    }
    if (user?.roles[0]?.id === 1) {
      axios
        .post(
          `http://134.122.94.140:5000/api/cv/post/${id}/comment`,
          {
            message: commentInput,
            role: 1,
          },
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          setRefresh(!refresh);

          setCommentInput("");
        });
    } else if (user?.roles[0]?.id === 3) {
      axios
        .post(
          `http://134.122.94.140:5000/api/comp/post/${id}/comment`,
          {
            message: commentInput,
            role: 3,
          },
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          // window.location.reload();
          setRefresh(!refresh);
          setCommentInput("");
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
    axios
      .put(`http://134.122.94.140:5000/api/cv/post/${postId}/${user.id}/liking`)
      .then(
        (response) => {
          setToggleLike(true);
          setShownLikes(shownLikes + 1);
          // setRefresh(true);
          // setRefresh(false);
        },
        (error) => {}
      );
  };
  const unlikePost = (postId) => {
    axios
      .delete(`http://134.122.94.140:5000/api/cv/post/${postId}/unliking`, {
        headers: authHeader(),
      })
      .then((response) => {
        // setRefresh(true);
        // setRefresh(false);
        setShownLikes(shownLikes - 1);
        setToggleLike(false);
      });
  };

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

  return (
    <div className="feed">
      <div className="post">
        {loading && (
          <Loader
            type="Oval"
            // color="rgb(63, 63, 63)"
            color="#6573c3"
            height={30}
            width={30}
            timeout={1500}
            className="loading_spinner"
          />
        )}
        {!errorMessage && !loading && (
          <>
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
                    src={userService.imageLink + owner?.cv?.image}
                    className={classes.large}
                  />
                )}
                {role === 3 && (
                  <Avatar
                    variant="square"
                    src={userService.imageLink + owner?.company?.companyImage}
                    className={classes.large}
                  />
                )}
              </Link>

              <div className="post_info">
                <h2 style={{ display: "flex" }}>
                  {role === 1 &&
                    owner?.cv?.about?.firstName +
                      " " +
                      owner?.cv?.about?.lastName}
                  {role === 3 && owner?.company?.aboutCompany?.name}
                </h2>
                <p>{`@${username}  - ${
                  role === 1 ? "Student" : "Enterprise"
                }`}</p>
                <span></span>
                <div className="post_date">
                  <h6 style={{ color: "#000" }}>{timestamp} &nbsp;</h6>
                  <PublicIcon className="global" style={{ color: "#000" }} />
                </div>
              </div>
            </div>
            <div className="post_body">
              <div className="post_message">{message}</div>
              {console.log(`hhh ${postId}`)}
              {imageType && (
                <ModalImage
                  className="post_image"
                  small={
                    "http://134.122.94.140:5000/upload/static/images/post" +
                    postId +
                    "." +
                    imageType
                  }
                  large={
                    "http://134.122.94.140:5000/upload/static/images/post" +
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

            {comments.length !== 0 && (
              <div className="comments-header">
                <h4>Comments</h4>
              </div>
            )}
            {toggleComment && (
              <div className="add-comment">
                <Avatar
                  src={
                    role == 1
                      ? userService.imageLink + ownerImage
                      : userService.imageLink + ownerImage
                  }
                  className={classes.large}
                />
                <textarea
                  rows="4"
                  className="add-text-area"
                  placeholder="Add a public comment"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}
            {comments?.map((e, key) => (
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
                onDelete={() => {
                  doReload();
                }}
              />
            ))}
          </>
        )}
        {errorMessage && !loading && <span>{errorMessage}</span>}
      </div>
    </div>
  );
}
