import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import axios from "axios";
import authHeader from "../../services/authHeader";
import { Avatar, TableFooter } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Close } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import authService from "../../services/authService";
import userService from "../../services/userService";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import Pagination from '@material-ui/lab/Pagination';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ListUsers({ user }) {
  const classes = useStyles();
  const [accounts, setAccounts] = useState();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [countx,setCountx]=useState(1);
  const [countgrid,setCountgrid]=useState(0);
  const handleChange=(e)=>{
      setCountx(parseInt(e.target.innerText));
  }
  const handleDelete = async (id) => {
    setLoading(true);
    await authService.deleteUser(id).then((response) => {
      setCount(count + 1);
    });
    setLoading(false);
  };
  const handleDisable = async (id) => {
    setLoading(true);
    await authService.disableAccount(id).then((res) => {
      setCount(count + 1);
    });
    setLoading(false);
  };
   const handleEnable = async (id) => {
    setLoading(true);
    await authService.enableAccount(id).then((res) => {
      setCount(count + 1);
    });
    setLoading(false);
  };

  useEffect(() => {
    function getAll() {
      userService.getAll().then((response) => {
        setAccounts(response?.data);
        Number.isInteger(response.data.length/10)?setCountgrid(response.data.length/10):setCountgrid(Math.floor(response.data.length/10)+1);
      });
    }
    getAll();
  }, [count]);
  return (
    <React.Fragment>
      <Title>All Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="center">Activé</TableCell>
            <TableCell align="center">Désactiver</TableCell>
            <TableCell align="center">Supprimer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts?.map(
            (account,index) =>
              account?.id != user?.id && index<=countx*10 && index>countx*10-10&&(
                <TableRow key={account.id}>
                  <TableCell>{index}</TableCell>
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
                    {account.enabled && (
                      <span className="text-success">Yes</span>
                    )}
                    {!account.enabled && (
                      <span className="text-danger">No</span>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {account.enabled?(<Button
                      disabled={loading}
                      onClick={() => {
                        handleDisable(account.id);
                      }}
                    >
                      <PersonAddDisabledIcon color="secondary" />
                    </Button>):(
                      <Button
                      disabled={loading}
                      onClick={() => {
                        handleEnable(account.id);
                      }}
                    >
                      <PersonAddIcon style={{color:"green"}} />
                    </Button>
                    )}
                    
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      disabled={loading}
                      onClick={() => {
                        handleDelete(account.id);
                      }}
                    >
                      <CloseIcon color="secondary" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
       <Pagination defaultPage={1} hideNextButton hidePrevButton onChange={handleChange} count={countgrid} className="mt-3" />
    </React.Fragment>
  );
}
