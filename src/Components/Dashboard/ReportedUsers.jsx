import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Avatar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";
import authService from "../../services/authService";
import userService from "../../services/userService";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ReportedUsers({ user }) {
  const classes = useStyles();
  const [accounts, setAccounts] = useState();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const handleDisable = async (id) => {
    setLoading(true);
    await authService.disableAccount(id).then((res) => {
      setCount(count + 1);
    });
    setLoading(false);
  };
  const handleRemove = async (id) => {
    setLoading(true);
    await authService.removeReport(id).then((res) => {
      setCount(count + 1);
    });
    setLoading(false);
  };

  useEffect(() => {
    function getReported() {
      userService.getReported().then((response) => {
        setAccounts(response?.data);
        console.log(response?.data);
      });
    }
    getReported();
  }, [count]);
  return (
    <React.Fragment>
      <Title>Utilisateurs signalés</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="center">Enlever</TableCell>
            <TableCell align="center">Désactiver</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts?.map(
            (account) =>
              account?.id != user?.id && (
                <TableRow key={account.id}>
                  <TableCell>{account.id}</TableCell>
                  <TableCell>
                    {account.roles[0].id === 1 && (
                      <Avatar src={userService.imageLink + account.cv.image} />
                    )}
                    {account.roles[0].id === 2 && (
                      <Avatar src={userService.imageLink + "admin.jpg"} />
                    )}
                    {account.roles[0].id === 3 && (
                      <Avatar
                        src={
                          userService.imageLink + account.company.companyImage
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
                  <TableCell>
                    {account.roles[0].id === 1 && "Student"}
                    {account.roles[0].id === 2 && "Admin"}
                    {account.roles[0].id === 3 && "Manager"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        handleRemove(account.id);
                      }}
                    >
                      <CheckIcon style={{ color: "green" }} />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      disabled={loading}
                      onClick={() => {
                        handleDisable(account.id);
                      }}
                    >
                      <PersonAddDisabledIcon color="secondary" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
