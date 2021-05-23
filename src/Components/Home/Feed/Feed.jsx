import React, { useState, useEffect, initialState, useRef } from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOption from "./InputOption/InputOption";
import PhotoIcon from "@material-ui/icons/Photo";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Post from "./Post/Post";
import axios from "axios";
import authHeader from "../../../services/authHeader";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
//import Shimmer from "react-shimmer-effect";
import userService from "../../../services/userService";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Loader from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";

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
  button: {
    border: "none",
    outline: "none",
  },
  container: {
    border: "0px solid rgba(255, 255, 255, 1)",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, .1)",
    borderRadius: "4px",
    backgroundColor: "white",
    display: "flex",
    padding: "16px",
    width: "100%",
    marginBottom: "20px",
  },
  circle: {
    height: "56px",
    width: "56px",
    borderRadius: "50%",
  },
  line: {
    width: "15%",
    height: "8px",
    alignSelf: "center",
    marginLeft: "16px",
    borderRadius: "8px",
  },
  longline: {
    width: "60%",
    height: "8px",
    alignSelf: "center",
    marginLeft: "16px",
    borderRadius: "8px",
  },
  break: {
    flexBasis: "100%",
    width: "0px",
    height: "0px",
    overflow: "hidden",
  },
  content: {
    width: "100%",
    height: "8px",
    alignSelf: "center",
    marginLeft: "16px",
    borderRadius: "8px",
  },
}));

const postsPerPage = 10;
let arrayForHoldingPosts = [];

function Feed(props) {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [res, setRes] = useState([]);
  const user = props?.user;
  const image = props?.image;

  const [message, setMessage] = useState(initialState);
  const [successful, setSuccessful] = useState(initialState);
  const [refresh, setRefresh] = useState(false);
  //const [loaded, setLoaded] = useState(false); // bash toggle shimmer

  // const [toggleLoadMore, setToggleLoadMore] = useState(false);

  const [childLoaderRefresh, setChildLoaderRefresh] = useState(false);

  const [postsToShow, setPostsToShow] = useState([]);
  const [count, setCount] = useState(1);

  const [loading, setLoading] = useState(false);

  //start img

  const fileInputRef = useRef(null);
  const uploadRef = useRef(null);
  const [newImage, setNewImage] = useState(null);
  const [fileType, setFileType] = useState(initialState);
  const [shown, setShown] = useState(10);
  const [fileContent, setFileContent] = useState([]);

  const onChange = (e) => {
    setFileContent(e.target.files[0]);
    setFileType(e.target.files[0].type.split("/")[1]);
    // if (e.target.files && e.target.files[0]) {
    //   let img = e.target.files[0];
    //   setNewImage(URL.createObjectURL(img));
    // }
    setNewImage(URL.createObjectURL(e.target.files[0]));
  };
  const fileUpload = async (imageNameCounter) => {
    const url = userService.uploadImageUrl;
    const formData = new FormData();
    const myRenamedFile = new File(
      [fileContent],
      "post" + imageNameCounter + "." + fileType
    );
    formData.append("file", myRenamedFile);
    const config = {
      headers: {
        Authorization: `Bearer ${authHeader()}`,
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };
  const handleClick = (e) => {
    fileUpload();
  };
  const triggerInputFile = () => {
    fileInputRef.current.click();
  };
  const clearImage = () => {
    setFileContent(null);
    setFileType(null);
    setNewImage(null);
  };

  const loadingSpinner = async () => {
    setLoading(true);
    setRefresh(!refresh);
    clearImage();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    window.scrollTo(0, 0);
  };

  // fin img

  //traitement showing posts
  const loopThroughPosts = (count) => {
    setShown(shown + 10);
    for (
      let i = count * postsPerPage - postsPerPage;
      i < postsPerPage * count;
      i++
    ) {
      if (posts[i] !== undefined) {
        arrayForHoldingPosts.push(posts[i]);
      }
    }
    setPostsToShow(arrayForHoldingPosts);
  };
  useEffect(() => {
    setCount((prevCount) => prevCount + 1);
    loopThroughPosts(count);
  }, []);

  const handleShowMorePosts = () => {
    setCount((prevCount) => prevCount + 1);
    loopThroughPosts(count);
  };

  //snackbar
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      uploadPost();
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      let result;
      if (user?.roles[0]?.id == 1) {
        result = await userService.getNonPrivatePosts();
      } else {
        result = await userService.getPosts();
      }
      setRes(result?.data);
      // setTimeout(() => {
      //   // setLoaded(true);
      //   // if (result?.data?.length > 10) {
      //   //   setToggleLoadMore(true);
      //   // }
      // }, 500);

      arrayForHoldingPosts = result?.data?.slice(0, 10);
    };
    getPosts();
  }, [refresh]);

  useEffect(() => {
    setPosts(res);
    setPostsToShow(res?.slice(0, 10));
  }, [res]);

  useEffect(() => {
    loadingSpinner();
  }, [childLoaderRefresh, props?.refreshHome]);

  const uploadPost = () => {
    const errors = [];
    if (input.length === 0) errors.push("Message cannot be empty.\n");
    if (errors.length !== 0) {
      setMessage(errors);
      setSuccessful(false);
      setOpen(true);
      return 0;
    }
    let post = {
      message: input,
      role: user?.roles[0]?.id,
      domaine: user?.cv?.about?.domaine,
    };
    if (newImage) {
      post.imageType = fileType;
    }

    if (user?.roles[0]?.id === 1) {
      userService.uploadStudentPost(post).then(
        (response) => {
          if (newImage) {
            fileUpload(response?.data);
          }
          setSuccessful(true);
          setMessage("Message uploaded!");
          setOpen(true);
          loadingSpinner();
          // window.location.reload();
          setInput("");
        },
        (error) => {
          setSuccessful(false);
          setMessage("Couldn't upload message");
          setOpen(true);
        }
      );
    } else if (user?.roles[0]?.id === 3) {
      userService.uploadCompanyPost(post).then(
        (response) => {
          if (newImage) {
            fileUpload(response?.data);
          }
          setSuccessful(true);
          setMessage("Message uploaded!");
          setOpen(true);
          loadingSpinner();
          // window.location.reload();
          setInput("");
        },
        (error) => {
          setSuccessful(false);
          setMessage("Couldn't upload message");
          setOpen(true);
        }
      );
    }
  };

  return (
    <div className="feed">
      {loading && (
        <Loader
          type="Oval"
          color="#6573c3"
          height={30}
          width={30}
          timeout={1500}
          className="loading_spinner"
        />
      )}
      {!loading && (
        <div className="feed">
          {user?.roles[0]?.id == 1 && (
            <div className="alert alert-warning alert-white rounded">
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-hidden="true"
              >
                ×
              </button>
              <div className="icon">
                <i
                  className="fas fa-exclamation-triangle"
                  style={{ marginTop: "25px" }}
                ></i>
              </div>
              <strong>Attention!</strong> Les administrateurs suivent l'accueil
              quotidiennement toute action inappropriée sera sanctionnée.
            </div>
          )}

          {user?.roles[0]?.id != 2 && (
            <div className="feed_inputContainer">
              <div className="feed_input">
                <CreateIcon />
                <form>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ cursor: "text", fontSize: "18px" }}
                    placeholder="De quoi voulez-vous parler?"
                    onKeyDown={handleKeyDown}
                  />
                </form>
              </div>
              {newImage && (
                <div>
                  <img
                    className="mx-auto d-block rounded border border-dark"
                    src={newImage}
                    style={{
                      maxHeight: "90%",
                      maxWidth: "90%",
                      margin: "10px 10px",
                    }}
                    alt="a"
                  />
                </div>
              )}
              <div className="feed_inputOptions">
                <InputOption
                  Icon={PhotoIcon}
                  title="Photo"
                  color="#7085F9"
                  onClick={triggerInputFile}
                />
                <div class="form-group mb-2 d-none">
                  <label
                    for="file-upload"
                    className="btn btn-outline-dark mt-2 "
                  >
                    <i class="fas fa-upload"></i>Choose File
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    className="d-none"
                    accept=".jpeg,.png,.jpg,.tif,.svg,.jfif"
                    ref={fileInputRef}
                    onChange={onChange}
                  />
                  <Button
                    className="MuiButton-sizeSmall MuiButton-textPrimary mt-2"
                    variant="outlined"
                    ref={uploadRef}
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    UPLOAD
                  </Button>
                </div>
                {newImage && (
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={clearImage}
                  >
                    <CloseIcon backgroundColor="gray" fontSize="large" />
                  </IconButton>
                )}
                <InputOption
                  Icon={PostAddIcon}
                  title="Publier"
                  color="green"
                  onClick={uploadPost}
                />
              </div>
            </div>
          )}
          <div className="feed_PostContainer">
            {/* {!loaded && ( // shimmer part
              <>
                <div className={classes.container}>
                  <Shimmer>
                    <div className={classes.circle} />
                    <div className={classes.line} />
                    <div className={classes.longline} />
                  </Shimmer>
                </div>
              </>
            )} */}
            {/* {loaded && */}
            <InfiniteScroll
              dataLength={shown}
              next={() => handleShowMorePosts()}
              hasMore={true}
              loader={<h4> ... </h4>}
            >
              {postsToShow?.map((e, key) => (
                <Post
                  key={key}
                  user={user}
                  postId={e?.id}
                  message={e?.message}
                  timestamp={e?.updatedAt.substring(0, 10)}
                  username={e?.ownerUsername}
                  name={e?.ownerName}
                  role={e?.role}
                  ownerId={e?.ownersId}
                  refresh={refresh}
                  currentUserId={user?.id}
                  ownerImage={image}
                  imageType={e?.imageType}
                  onChange={(value) => setChildLoaderRefresh(value)}
                />
              ))}
            </InfiniteScroll>
          </div>
          {/* {toggleLoadMore && postsToShow.length != res.length && (
            <Button
              size="small"
              variant="contained"
              onClick={handleShowMorePosts}
            >
              Load more
            </Button>
          )} */}
        </div>
      )}
    </div>
  );
}

export default Feed;