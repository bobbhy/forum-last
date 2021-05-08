import React, { useState, useEffect } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import CloseIcon from "@material-ui/icons/Close";
import Title2 from "./Title";
import { Avatar } from "@material-ui/core";

import TableRow from "@material-ui/core/TableRow";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import authHeader from "../../services/authHeader";

import { Animation } from "@devexpress/dx-react-chart";
import axios from "axios";
import userService from "../../services/userService";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    width: "20vw",
    minWidth: "400px",
    margin: "1vh 0vw",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardcontainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
  },
  chartcontainer: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "1000px",
    maxHeight: "500px",
    marginRight: "2vw",
  },
  chartpaper: {
    minWidth: "700px",
    width: "1000px",
  },
  maincontainer: {
    display: "flex",
    flexDirection: "row",
  },
  maincontainer2: {
    display: "flex",
    flexDirection: "row",
    marginTop: "2vh",
  },
  flexing: {
    display: "flex",
  },
  tablee: {
    maxWidth: "1000px",
  },
}));

const data = [
  { day: "12/04", visitors: 80 },
  { day: "13/04", visitors: 120 },
  { day: "14/04", visitors: 135 },
  { day: "15/04", visitors: 126 },
  { day: "16/04", visitors: 179 },
  { day: "17/04", visitors: 207 },
];

export default function ListUsers({ user }) {
  const classes = useStyles();
  const [accounts, setAccounts] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getAll() {
      await axios
        .get("https://www.forum-uit.codes/api/profile/getall", {
          headers: authHeader(),
        })
        .then((response) => {
          setAccounts(response?.data);
        });
    }
    getAll();
  }, [count]);

  return (
    <div>
      <div className={classes.maincontainer}>
        <div className={classes.flexing}>
          <div className={classes.chartcontainer}>
            <Paper className={classes.chartpaper}>
              <Chart data={data}>
                <ArgumentAxis />
                <ValueAxis max={7} />
                <BarSeries valueField="visitors" argumentField="day" />
                <Title text="Daily Visitors" />
                <Animation />
              </Chart>
            </Paper>
          </div>
          <div className={classes.cardcontainer}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Visitors
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Today
                </Typography>
                <Typography variant="h4" component="p">
                  {Math.ceil(Math.random() * 300)}{" "}
                  <TrendingUpIcon
                    style={{ color: "#4caf50" }}
                    fontSize="small"
                  />
                  <span
                    style={{
                      color: "#4caf50",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    5.5%
                  </span>
                  <br />
                </Typography>
                <Typography variant="body2" component="p">
                  Last 7 days: 74{" "}
                  <ArrowUpwardIcon
                    style={{ color: "#4caf50" }}
                    fontSize="small"
                  />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="secondary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Visitors
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Today
                </Typography>
                <Typography variant="h4" component="p">
                  {Math.ceil(Math.random() * 300)}{" "}
                  <TrendingDownIcon
                    style={{ color: "#d50000" }}
                    fontSize="small"
                  />
                  <span
                    style={{
                      color: "#d50000",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    5.5%
                  </span>
                  <br />
                </Typography>
                <Typography variant="body2" component="p">
                  Last 7 days: -20{" "}
                  <ArrowDownwardIcon
                    style={{ color: "#d50000" }}
                    fontSize="small"
                  />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="secondary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>

      <div className={classes.maincontainer2}>
        <div className={classes.flexing}>
          <div className={classes.chartcontainer}>
            <Paper className={classes.chartpaper}>
              <Title2>&nbsp; Logged In Users</Title2>
              <Card className={classes.tablee}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Full Name</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accounts?.slice(0, 5).map(
                      (account) =>
                        account.id != user.id && (
                          <TableRow key={account.id}>
                            <TableCell>{account.id}</TableCell>
                            <TableCell>
                              {account.roles[0].id === 1 && (
                                <Avatar
                                  src={
                                    userService.imageLink +
                                    account.cv.image
                                  }
                                />
                              )}
                              {account.roles[0].id === 2 && (
                                <Avatar
                                  src={
                                    userService.imageLink + "admin.jpg"
                                  }
                                />
                              )}
                              {account.roles[0].id === 3 && (
                                <Avatar
                                  src={
                                    "https://www.forum-uit.codes/upload/static/images/" +
                                    account.company.companyImage
                                  }
                                />
                              )}
                            </TableCell>

                            <TableCell>
                              {account.name
                                .split(" ")
                                .map(
                                  (e) => e.charAt(0).toUpperCase() + e.slice(1)
                                )
                                .join(" ")}
                            </TableCell>
                            <TableCell>{account.username}</TableCell>
                            <TableCell>{account.email}</TableCell>
                            <TableCell>
                              {account.roles[0].id === 1 && "Student"}
                              {account.roles[0].id === 2 && "Admin"}
                              {account.roles[0].id === 3 && "Manager"}
                            </TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                </Table>
              </Card>
            </Paper>
          </div>
          <div className={classes.cardcontainer}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Visitors
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Today
                </Typography>
                <Typography variant="h4" component="p">
                  {Math.ceil(Math.random() * 300)}{" "}
                  <TrendingDownIcon
                    style={{ color: "#d50000" }}
                    fontSize="small"
                  />
                  <span
                    style={{
                      color: "#d50000",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    5.5%
                  </span>
                  <br />
                </Typography>
                <Typography variant="body2" component="p">
                  Last 7 days: -20{" "}
                  <ArrowDownwardIcon
                    style={{ color: "#d50000" }}
                    fontSize="small"
                  />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="secondary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
