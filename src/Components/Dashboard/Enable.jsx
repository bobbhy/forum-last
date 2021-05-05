import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import CheckIcon from "@material-ui/icons/Check";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import userService from "../../services/userService";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ListUsers({ refresh, onChange }) {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [accounts,setAccounts]=useState([])
  useEffect(() => {
    function getAll() {
      userService.getAll()
        .then((response) => {
          console.log(response?.data)
          setAccounts(response?.data);
        });
    }
    getAll();
  }, [count]);

  const enableManager = (id) => {
    async function enabling() {
      await axios
        .put(`http://134.122.94.140/api/cv/enable/${id}`)
        .then((response) => {
          onChange(!refresh);
          setCount(count + 1);
        });
    }
    enabling();
  };

  return (
    <React.Fragment>
      <Title>Unenabled Managers</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Enable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts?.map(
            (account) =>
              account.roles[0].id === 3 &&
              !account.enabled && (
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
                    {account.roles[0].id === 3 && (
                      <Avatar
                        src={
                          userService.imageLink
                           +
                          account.company.companyImage
                        }
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    {account.name
                      .split(" ")
                      .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                      .join(" ")}
                  </TableCell>
                  <TableCell>{account.username}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>Manager</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        enableManager(account.id);
                      }}
                    >
                      <CheckIcon style={{ color: "green" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more
        </Link>
      </div>
    </React.Fragment>
  );
}