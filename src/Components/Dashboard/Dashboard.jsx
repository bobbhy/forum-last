import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListUsers from "./ListUsers";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Statistics from "./Statistics";
import Enable from "./Enable";
import axios from "axios";
import authHeader from "../../services/authHeader";
import Charts from "./Charts";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import authService from "../../services/authService";
import EmailIcon from "@material-ui/icons/Email";
import { useHistory } from "react-router";
import Messages from "./Messages";
import userService from "../../services/userService"

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: "100vw",
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    width: "100vw",
  },
  paper: {
    padding: theme.spacing(2),
    width: "80vw",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));
export default function Dashboard({ user }) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const [toggleDash, setToggleDash] = useState(true);
  const [toggleStatistics, setToggleStatistics] = useState(false);
  const [toggleEnable, setToggleEnable] = useState(false);
  const [toggleMessages, setToggleMessages] = useState(false);

  const [dada, setDada] = useState([]);

  const [accounts, setAccounts] = useState();

  const [refresh, setRefresh] = useState(false);

  const handleLogout = () => {
    authService.logout();
    history.push("/register");
    window.location.reload();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleDashClick = () => {
    setToggleDash(true);
    setToggleStatistics(false);
    setToggleEnable(false);
    setToggleMessages(false);
  };
  const handleStatisticsClick = () => {
    setToggleDash(false);
    setToggleStatistics(true);
    setToggleMessages(false);
    setToggleEnable(false);
  };
  const handleEnableClick = () => {
    setToggleDash(false);
    setToggleStatistics(false);
    setToggleMessages(false);
    setToggleEnable(true);
  };
  const handleMessageClick = () => {
    setToggleDash(false);
    setToggleStatistics(false);
    setToggleEnable(false);
    setToggleMessages(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            endIcon={<ExitToAppIcon />}
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem button onClick={handleDashClick}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={handleStatisticsClick}>
              <ListItemIcon>
                <EqualizerIcon />
              </ListItemIcon>
              <ListItemText primary="Statistics" />
            </ListItem>
            <ListItem button onClick={handleEnableClick}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Enable Managers" />
            </ListItem>
            <ListItem button onClick={handleMessageClick}>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {toggleDash && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Hello{" "}
                  {user?.name
                    .split(" ")
                    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                    .join(" ")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ListUsers user={user} />
                </Paper>
              </Grid>
            </Grid>
          )}
          {toggleMessages && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Hello{" "}
                  {user?.name
                    .split(" ")
                    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                    .join(" ")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Messages accounts={accounts} user={user} />
                </Paper>
              </Grid>
            </Grid>
          )}
          {toggleStatistics && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Hello{" "}
                  {user?.name
                    .split(" ")
                    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                    .join(" ")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Statistics user={user} />
              </Grid>
            </Grid>
          )}
          {toggleEnable && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Hello{" "}
                  {user?.name
                    .split(" ")
                    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                    .join(" ")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Enable
                    refresh={refresh}
                    onChange={(value) => setRefresh(value)}
                  />
                </Paper>
              </Grid>
            </Grid>
          )}
        </Container>
      </main>
    </div>
  );
}
