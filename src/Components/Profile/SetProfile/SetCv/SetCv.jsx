import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Image from "./SetCvChildren/Image";
import About from "./SetCvChildren/About";
import FormModal from "./SetCvChildren/Experience";
import Education from "./SetCvChildren/Education";
import SkillForm from "./SetCvChildren/SkillForm";
import Award from "./SetCvChildren/Award";
import userService from "../../../../services/userService";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "90% !important",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "auto",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
const steps = ["Photo", "About", "Experience", "Education", "Skill", "Awards"];

export default function SetCv(props) {
  const user = props?.user;
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const [toggle, setToggle] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleClick = (e) => {
    handleNext();
    setToggle(false);
    if (e.target.innerHTML === "Confirmer") {
      userService.flagStudent(props.user.id);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Image
            onChange={(value) => {
              setToggle(value);
            }}
            id={props?.user?.id}
            image={props?.user?.cv?.image}
          />
        );
      case 1:
        return (
          <About
            name={user?.name}
            onChange={(value) => {
              setToggle(value);
            }}
          />
        );
      case 2:
        return (
          <FormModal
            onChange={(value) => {
              setToggle(value);
            }}
          />
        );
      case 3:
        return (
          <Education
            onChange={(value) => {
              setToggle(value);
            }}
          />
        );
      case 4:
        return (
          <SkillForm
            onChange={(value) => {
              setToggle(value);
            }}
          />
        );
      case 5:
        return (
          <Award
            onChange={(value) => {
              setToggle(value);
            }}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {/* <Typography component="h1" variant="h4" align="center">
            Title
          </Typography> */}
          <div className="d-flex flex-wrap">
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className={classes.stepper}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <div className="flex-fill mt-4 ml-5 w-75">
                    <Typography variant="h4" gutterBottom>
                      Merci pour votre temps
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Comme prochaine étape, nous suggérons de reprendre le même
                      processus dans le site web universitaire cvthèque :&nbsp;
                      <Link
                        style={{ fontSize: 20 }}
                        component="button"
                        variant="body2"
                        onClick={() => {
                          window.open("https://cvtheque.uit.ac.ma/", "_blank");
                        }}
                      >
                        Ici
                      </Link>
                    </Typography>
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => window.location.reload()}
                    >
                      View your Profile
                    </Button>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="flex-fill mt-4  d-flex justify-content-center">
                    {getStepContent(activeStep)}
                  </div>
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={() => {
                          handleBack();
                          setToggle(true);
                        }}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!toggle}
                      onClick={handleClick}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Confirmer" : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
