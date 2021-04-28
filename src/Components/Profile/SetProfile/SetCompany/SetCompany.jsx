import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
//CHILDREN
import CompanyImage from "./AddCompany Components/CompanyImage";
import AboutCompany from "./AddCompany Components/AboutCompany";

// import "../css/cv.css";

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
const steps = ["Photo", "Company Info"];

export default function SetCompany(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const user = props?.user;

  const [toggle, setToggle] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <CompanyImage
            onChange={(value) => {
              setToggle(value);
            }}
            id={user?.id}
          />
        );
      case 1:
        return (
          <AboutCompany
            user={user}
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
                  <div className="flex-fill mt-4 ml-4">
                    <Typography variant="h5" gutterBottom>
                      Thank you for your Time.
                    </Typography>
                  </div>

                  <Typography variant="subtitle1" decor>
                    The info you have input is now visible to everyone
                  </Typography>
                  <div className={classes.buttons}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
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
                      onClick={() => {
                        handleNext();
                        setToggle(false);
                      }}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Confirm" : "Next"}
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
