import Navbar from "./cv/Navbar";
import "../js/cv";
import About from "./cv/About";
import AboutCompany from "./company/About";
import Nav from "./company/Nav";
import Education from "./cv/Education";
import Experience from "./cv/Experience";
import Skill from "./cv/Skill";
import Interests from "./cv/Interest";
import Award from "./cv/Award";
import React, { useState, useEffect } from "react";
import userService from "../../../services/userService";
import Modal from "react-bootstrap/Modal";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditAbout from "./EditCv/EditAbout";
import EditExperience from "./EditCv/EditExperience";
import EditEducation from "./EditCv/EditEducation";
import EditDevLanguages from "./EditCv/EditDevLanguages";
import EditNormalLanguages from "./EditCv/EditNormalLanguages";
import EditSoftware from "./EditCv/EditSoftware";
import EditAwards from "./EditCv/EditAwards";
import BootAccordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SendIcon from "@material-ui/icons/Send";
import EditAboutCompany from "./EditCompany/EditAboutCompany";
import EditImage from "./EditCv/EditImage";
import { useHistory } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Tooltip from '@material-ui/core/Tooltip';

import "./Cv.css";

// import EditSkills from "./Edit Cv/EditSkills";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#fff",
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: "30px",
  },
}));

const Cv = (props) => {
  const history = useHistory();
  const [currentUserId, setCurrentUserId] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [isFriend, setIsFriend] = useState(-1);
  const [cv, setCv] = useState({});
  const [company, setCompany] = useState({});
  const [email, setEmail] = useState("");
  const [role, setRole] = useState();
  const [flag, setFlag] = useState(false);
  const id = props?.match?.params?.id;
  const [data, setData] = useState({});
  const [toggle, setToggle] = useState(false);
  const [image, setImage] = useState();
  const [count, setCount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const classes = useStyles();
  const [isExperience, setIsExperience] = useState(true);
  const [switchState, setSwitchState] = useState(true);
  const handleSwitchChange = () => {
    if (switchState) {
      userService.unpriveCv(currentUserId).then(
        (res) => {
          setSwitchState(!switchState);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      userService.priveCv(currentUserId).then((res) => {
        setSwitchState(!switchState);
      });
    }
  };

  const connectTo = async () => {
    try {
      const resp = await userService.connectTo(id);
      setCount(count + 1);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  const disconnect = async () => {
    try {
      await userService.disconnect(id).then((response) => {
        setCount(count + 1);
        window.location.reload();
      });
    } catch (err) {
      console.error(err);
    }
  };
  const handleMessage = () => {
    history.push(`/Messages/${id}`);
  };

  useEffect(() => {
    async function getUserById() {
      await userService.getUserById(id).then((response) => {
        setCv(response?.data?.cv);
        if (response?.data?.cv?.experiences.length === 0) {
          setIsExperience(false);
        }
        setData(response?.data);
        setSwitchState(response?.data?.cv?.prive);
        setCompany(response?.data?.company);
        setEmail(response?.data?.email);
        setRole(response?.data?.roles[0]?.id);
        if (response?.data?.roles[0]?.id === 1) {
          setImage(
            userService.imageLink + response?.data?.cv?.image
          );
        }
        if (response?.data?.roles[0]?.id === 3) {
          setImage(
            userService.imageLink + response?.data?.company?.companyImage
          );
        }
        setFlag(response?.data?.cv?.flag || response?.data?.company?.flag);
        setToggle(false);
      });
    }
    getUserById();
    async function getUserData() {
      await userService.getUserData().then((response) => {
        setCurrentUserId(response?.data?.id);
        setCurrentUser(response?.data);
        response?.data?.friendshipSended.forEach((friendship) => {
          if (friendship.id.receiverId == id) {
            if (friendship.status === false) {
              setIsFriend(0);
            } else {
              setIsFriend(1);
            }
          }
        });
        response?.data?.friendshipReceived.forEach((friendship) => {
          if (friendship.id.senderId == id) {
            if (friendship.status === false) {
              setIsFriend(0);
            } else {
              setIsFriend(1);
            }
          }
        });
      });
    }
    getUserData();
  }, [count, currentUserId, toggle]);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size={role === 1 ? "xl" : "lg"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Editing Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={classes.root}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="bg-dark text-white"
              >
                <Typography className={classes.heading}>Edit Image</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <EditImage
                  data={data}
                  role={data?.roles[0]?.id}
                  toggle={toggle}
                  onChange={(value) => {
                    setToggle(value);
                    setModalShow(false);
                  }}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="bg-dark text-white"
              >
                <Typography className={classes.heading}>
                  Edit About Section
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {role === 1 && (
                  <EditAbout
                    data={data?.cv?.about}
                    id={id}
                    toggle={toggle}
                    onChange={(value) => {
                      setToggle(value);
                      setModalShow(false);
                    }}
                  />
                )}
                {role === 3 && (
                  <EditAboutCompany
                    data={data?.company?.aboutCompany}
                    id={data?.id}
                    toggle={toggle}
                    onChange={(value) => {
                      setToggle(value);
                      setModalShow(false);
                    }}
                  />
                )}
              </AccordionDetails>
            </Accordion>
            {role === 1 && (
              <>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="bg-dark text-white"
                  >
                    <Typography className={classes.heading}>
                      Edit Experience Section
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <EditExperience
                      data={data}
                      id={id}
                      toggle={toggle}
                      onChange={(value) => {
                        setToggle(value);
                        setModalShow(false);
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="bg-dark text-white"
                  >
                    <Typography className={classes.heading}>
                      Edit Education Section
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <EditEducation
                      toggle={toggle}
                      onChange={(value) => {
                        setToggle(value);
                        setModalShow(false);
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="bg-dark text-white"
                  >
                    <Typography className={classes.heading}>
                      Edit Skills Section
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <BootAccordion
                      defaultActiveKey="0"
                      className="w-100 align-items-center"
                    >
                      <BootAccordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey="0"
                      >
                        Dev Languages
                      </BootAccordion.Toggle>
                      <BootAccordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey="1"
                      >
                        Language
                      </BootAccordion.Toggle>
                      <BootAccordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey="2"
                      >
                        Softwares
                      </BootAccordion.Toggle>
                      <BootAccordion.Collapse eventKey="0">
                        <Card.Body>
                          <EditDevLanguages
                            toggle={toggle}
                            onChange={(value) => {
                              setToggle(value);
                              setModalShow(false);
                            }}
                          />
                        </Card.Body>
                      </BootAccordion.Collapse>

                      <BootAccordion.Collapse eventKey="1">
                        <Card.Body>
                          <EditNormalLanguages
                            toggle={toggle}
                            onChange={(value) => {
                              setToggle(value);
                              setModalShow(false);
                            }}
                          />
                        </Card.Body>
                      </BootAccordion.Collapse>

                      <BootAccordion.Collapse eventKey="2">
                        <Card.Body>
                          <EditSoftware
                            toggle={toggle}
                            onChange={(value) => {
                              setToggle(value);
                              setModalShow(false);
                            }}
                          />
                        </Card.Body>
                      </BootAccordion.Collapse>
                    </BootAccordion>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="bg-dark text-white"
                  >
                    <Typography className={classes.heading}>
                      Edit Awards Section
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <EditAwards data={data} />
                  </AccordionDetails>
                </Accordion>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      {flag && (
        <div className="cv_body">
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              setToggle(!toggle);
            }}
          />
          {role === 1 && (
            <div id="page-top">
              <Navbar image={image} isExperience={isExperience} />
              {/* Page Content*/}
              <div className="container-fluid p-0">
                <hr className="m-0 pt-5 mr-3" />
                {/* {props.id === currentUserId && <Edit data={data} />} */}
                <div className="d-flex flex-row-reverse mr-5">
                  {currentUserId == id ? (
                    <>
                      <Button
                        onClick={() => setModalShow(true)}
                        variant="contained"
                        size="medium"
                        style={{
                          position: "fixed",
                          top: "18vh",
                          right: "2vw",
                        }}
                        startIcon={
                          <EditIcon
                            style={{
                              maxWidth: "30px",
                              maxHeight: "30px",
                              minWidth: "30px",
                              minHeight: "30px",
                            }}
                          />
                        }
                      >
                        Edit Your Profile
                      </Button>
                      <Tooltip title="En mode privé, vos informations et vos postes ne sont pas visibles aux étudiants inconnus">
                        <FormControlLabel
                          style={{
                            position: "fixed",
                            top: "28vh",
                            right: "5vw",
                          }}
                          control={
                            <Switch
                              checked={switchState}
                              onChange={handleSwitchChange}
                              color="primary"
                            />
                          }
                          label="Mode privé"
                        />
                      </Tooltip>
                    </>
                  ) : (
                    <div
                      className="buttons d-flex"
                      style={{ position: "fixed", top: "18vh", right: "2vw" }}
                    >
                      {isFriend === 1 && (
                        <>
                          <Button
                            variant="contained"
                            color="danger"
                            className={classes.button}
                            onClick={disconnect}
                          >
                            Disconnect
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleMessage}
                            className={classes.button}
                            endIcon={<SendIcon />}
                          >
                            Message
                          </Button>
                        </>
                      )}
                      {isFriend === 0 && (
                        <Button
                          variant="contained"
                          disabled
                          className={classes.button}
                        >
                          Sent
                        </Button>
                      )}
                      {isFriend === -1 && (
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          onClick={connectTo}
                        >
                          Connect
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        className={classes.button}
                        endIcon={<MoreHorizIcon />}
                      >
                        More
                      </Button>
                    </div>
                  )}
                </div>
                {/* About*/}

                {currentUserId != id && switchState && currentUser?.roles[0]?.id == 1 && isFriend != 1 && (
                  <h2>Cet utilisateur a un profil privé</h2>
                )}
                {currentUserId == id && (
                  <>
                    {" "}
                    <About data={cv?.about} email={email} />
                    {isExperience && (
                      <>
                        <hr className="m-0" />
                        {/* Experience*/}
                        <Experience data={cv?.experiences} />
                      </>
                    )}
                    <hr className="m-0" />
                    {/* Education*/}
                    <Education data={cv?.educations} />
                    <hr className="m-0" />
                    {/* Skills*/}
                    <Skill
                      dev={cv?.devLanguages}
                      normal={cv?.normalLanguages}
                      software={cv?.softwares}
                    />
                    <hr className="m-0" />
                    {/* Interests*/}
                    <Interests data={cv?.about?.interests} />
                    <hr className="m-0" />
                    {/* Awards*/}
                    {cv?.awards.length !== 0 && <Award data={cv?.awards} />}
                  </>
                )}
              </div>
            </div>
          )}

          {role === 3 && (
            <div id="page-top">
              {currentUserId == id ? (
                <Button
                  onClick={() => setModalShow(true)}
                  variant="contained"
                  size="medium"
                  style={{ position: "fixed", top: "18vh", right: "2vw" }}
                  startIcon={
                    <EditIcon
                      style={{
                        maxWidth: "30px",
                        maxHeight: "30px",
                        minWidth: "30px",
                        minHeight: "30px",
                      }}
                    />
                  }
                >
                  Edit Your Profile
                </Button>
              ) : (
                <div
                  className="buttons d-flex"
                  style={{ position: "fixed", top: "18vh", right: "2vw" }}
                >
                  {isFriend === 1 && (
                    <>
                      <Button
                        variant="contained"
                        color="danger"
                        className={classes.button}
                        onClick={disconnect}
                      >
                        Disconnect
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<SendIcon />}
                        onClick={handleMessage}
                      >
                        Message
                      </Button>
                    </>
                  )}
                  {isFriend === 0 && (
                    <Button
                      variant="contained"
                      disabled
                      className={classes.button}
                      onClick={connectTo}
                    >
                      Sent
                    </Button>
                  )}
                  {isFriend === -1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={connectTo}
                    >
                      Connect
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    className={classes.button}
                    endIcon={<MoreHorizIcon />}
                  >
                    More
                  </Button>
                </div>
              )}
              <Nav id={id} image={image} />
              <AboutCompany data={company?.aboutCompany} email={email} />
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Cv;