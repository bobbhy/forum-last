import React, { useEffect, useState } from "react";
//Materiel Ui
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
//component imports
import Welcome from "./Presentation Children/welcome";
import Team from "./Presentation Children/Team"
import ContactUs from "./Presentation Children/ContactUs";
import Footer from "./Presentation Children/Footer";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const GlobalCss = withStyles({
  "@global": {
    ".MuiBox-root": {
      padding: "0px",
    },
  },
})(() => null);
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "bolder",
    "&:hover, &:focus": {
      color: "black",
      textDecoration: "none",
    },
    "&:active": {
      color: "black",
      textDecoration: "none",
    },
  },
}));
const Presentation = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => { }, []);
  return (
    <>
      <div className={classes.root}>
        <GlobalCss />
        <AppBar position="static" color="whitesmoke">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab
              label="Accueil"
              {...a11yProps(0)}
              style={{ outline: "none" }}
            />
            <Tab label="Team" {...a11yProps(1)} style={{ outline: "none" }} />

            <Tab
              label="contact-us"
              {...a11yProps(4)}
              style={{ outline: "none" }}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Welcome />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Team />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <ContactUs />
        </TabPanel>
        <Footer/>
      </div>
      <Snackbar open={open} autoHideDuration={20000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          <a href="./profile" className={classes.link}>
            Set up your profile here
          </a>
        </Alert>
      </Snackbar>
    </>
  );
};
export default Presentation;
