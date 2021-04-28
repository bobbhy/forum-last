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
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));


export default function Messages() {
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState();
    const [count, setCount] = useState(0)
    const handleDelete = async (id) => {
        setLoading(true)
        await axios.delete(`http://localhost:5000/contact/message/${id}`).then((response) => {
            setCount(count + 1)
        })
        setLoading(false)
    }

    useEffect(() => {
        async function getAll() {
            await axios
                .get("http://localhost:5000/contact/messages")
                .then((response) => {
                    setMessages(response?.data);
                });
        }
        getAll();
    }, [count]);
    return (
        <React.Fragment>
            <Title>All Messages</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {messages?.map(
                        (message) =>
                        (
                            <TableRow key={message.id}>
                                <TableCell>{message.id}</TableCell>
                                <TableCell>
                                    {message.name}
                                </TableCell>
                                <TableCell>
                                    {message.email}
                                </TableCell>
                                <TableCell>{message.message}</TableCell>
                                <TableCell align="center">
                                    <Button disabled={loading} onClick={() => {
                                        handleDelete(message.id)
                                    }}>
                                        <CloseIcon
                                            color="secondary"
                                        />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>

            {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more
        </Link>
      </div> */}
        </React.Fragment>
    );
}
