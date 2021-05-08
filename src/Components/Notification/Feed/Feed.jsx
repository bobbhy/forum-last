import { Avatar, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import React, { useState, useEffect } from 'react'
import styles from './Feed.module.css'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import userService from '../../../services/userService';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MessageIcon from '@material-ui/icons/Message';
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
function Feed() {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [notifications, setNotifications] = useState([])
    const history = useHistory();
    useEffect(() => {
        const getNotifications = async () => {
            await userService.getAllNotifications().then((response) => {
                setNotifications(response.data);
            })
        }
        getNotifications()
    }, [count]);
    const accept = async (e, id) => {
        try {
            setLoading(true)
            const resp = await userService.accept(id);
            setLoading(false)
            setCount(count + 1)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
    const handleClick = (id) => {
        history.push('/view/' + id)
        // window.location.reload()
    }
    const handleMessage = (id) => {
        history.push('/Messages/' + id)
    }
    const deleteNotification = async (id) => {
        try {
            setLoading(true)
            const resp = await userService.deleteNotification(id);
            setLoading(false)
            setCount(count + 1)
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
    const handleSingleNotif = async (id) => {
        try {
            setLoading(true)
            const resp = await userService.handleSingleNotif(id);
            setLoading(false)
            setCount(count + 1)
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
    return (
        <div className={styles.feed}>
            <div className={styles.feedContainer}>
                {notifications?.map(notification => (
                    <div className={`${styles.notif} ${!notification.status && styles.new}`} >
                        <Avatar className={styles.image} src={userService.imageLink + notification.ownerImage} />
                        <div className={styles.info}>
                            <h3><span className={styles.name} onClick={() => handleClick(notification.ownersId)}>{notification.ownerName}</span> <span className={styles.follow}>{notification.message}</span></h3>
                            <div className="buttons">
                                {notification.message === "Followed you" && notification.status === false && <Button
                                    size="small"
                                    variant="contained"
                                    style={{
                                        borderRadius: 15,
                                        backgroundColor: "#21b6ae",
                                        marginRight: 10
                                    }}
                                    disabled={loading === true ? "disabled" : ""}
                                    startIcon={<AddIcon fontSize='inherit' />}
                                    onClick={(e) => accept(e, notification.ownersId)}
                                >
                                    Accept
                                </Button>}
                                {notification.message === "Followed you" && notification.status === true && <Button
                                    size="small"
                                    style={{ color: "#5cb85c" }}
                                    disabled
                                    startIcon={<CheckCircleIcon style={{ color: 'inherit' }} fontSize='inherit' />}
                                >
                                    Connected
                                </Button>}
                                {notification.message === "has commented on your post" && (
                                    <Link
                                        to={"/post/" + notification.postId}
                                        style={{ textDecoration: "none" }}
                                        onClick={() => {
                                            handleSingleNotif(notification.id)
                                        }}
                                    >
                                        <Button
                                            startIcon={<ArrowRightAltIcon />}
                                            variant="contained"
                                        >
                                            Go to post
                                        </Button>
                                    </Link>
                                )}
                                {notification.message === "has liked your post" && (
                                    <Link
                                        to={"/post/" + notification.postId}
                                        style={{ textDecoration: "none" }}
                                        onClick={() => {
                                            handleSingleNotif(notification.id)
                                        }}
                                    >
                                        <Button
                                            startIcon={<ArrowRightAltIcon />}
                                            variant="contained"
                                            onClick={() => {
                                                handleSingleNotif(notification.id)
                                            }}
                                        >
                                            Go to post
                                        </Button>
                                    </Link>
                                )}
                                {notification.message === "has liked your comment" && (
                                    <Link
                                        to={"/post/" + notification.postId}
                                        style={{ textDecoration: "none" }}
                                        onClick={() => {
                                            handleSingleNotif(notification.id)
                                        }}
                                    >
                                        <Button
                                            startIcon={<ArrowRightAltIcon />}
                                            variant="contained"
                                        >
                                            Go to post
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <IconButton color="secondary" disabled={loading === true ? "disabled" : ""} onClick={() => deleteNotification(notification.id)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="message" onClick={() => handleMessage(notification.ownersId)}>
                                <MessageIcon />
                            </IconButton>
                        </div>
                    </div>

                ))}

            </div>
        </div >
    )
}

export default Feed
