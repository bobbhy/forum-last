import React, { useMemo, useState, useEffect, useRef, initialValue } from 'react'
import styles from './Feed.module.css'
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import userService from '../../../services/userService';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import CloseIcon from "@material-ui/icons/Close";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import authHeader from '../../../services/authHeader';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
function Feed({ id, isNew, name, date, img, user }) {
    const [input, setInput] = useState("")
    const [profiles, setProfiles] = useState("")
    const [flag, setFlag] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [open, setOpen] = useState(false)
    const [messagex, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [count, setCount] = useState(0)
    const [top, setTop] = useState(false)
    const feed = useRef(initialValue)
    const handleClose = (e) => {
        setOpen(!open);
        setProfiles([]);
        setInput("");
        setFlag(false);
    };
    const handleChange = (e) => {
        const message = e.target.value
        setMessage(message)
    }
    const sendMessage = async () => {
        const messagePayload = {
            jwt: authHeader().Authorization,
            message: messagex,
            receiverId: id
        }
        setLoading2(true)
        await userService.sendMessage(messagePayload).then((response) => {
            setTimeout(() => {
                setMessage("")
                setLoading2(false)
                setCount(count + 1)
            }, 200);
        })
        // clientRef.sendMessage("/app/chat.sendMessage", JSON.stringify(messagePayload))
    }
    // setInterval(() => {
    //     setCount(count + 1)
    // }, 10000);
    useMemo(() => {
    }, [id, isNew, name, date, img]);
    useEffect(() => {
        const getMessages = async () => {
            setLoading1(true)
            console.log(id)
            await userService.getMessages(id).then((response) => {
                console.log(response.data)
                setMessages(response.data)
                setLoading1(false)
            },
                (error) => {
                    console.log(error)
                })
        }
        getMessages();
        console.log("ok")
    }, [id, count]);
    const handleSearchChange = (e) => {
        const inputx = e.target.value;
        setInput(inputx);
        if (inputx) {
            setOpen(true)
            setLoading(true)
            userService.getUsersLike(inputx).then((response) => {
                setProfiles(response.data);
                setFlag(true);
            });
            setLoading(false)
        } else {
            setProfiles([]);
        }
    }
    const handleMessageReceived = (msg) => {
        console.log(msg)
        setMessages([...messages, msg])
    }
    const handleScroll = (e) => {
        console.log(top)
        if (e.target.scrollTop < 50) {
            setTop(false)
        }
        else {
            setTop(true)
        }
    }
    const handleTop = () => {
        feed.current.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
    const deleteMessage = async (id) => {
        console.log(id)
        userService.deleteMesssage(id).then((response) => console.log(response))
        setCount(count + 1)
    }
    return (
        <div className={styles.container}>
            {isNew ? (<>
                <div className={styles.sidebarNav}>
                    <div className={styles.infos}>
                        <h4>New Message</h4>
                    </div>
                    <div className={styles.actions}>
                        <IconButton aria-label="More" >
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                </div>
                <div className={styles.searchBar}>
                    <input type="text" className={styles.search} value={input} onChange={handleSearchChange} placeholder="Type a name or multiple name" />
                    {open && <CloseIcon className={styles.close} onClick={handleClose} />}
                </div>
                <div className={styles.output}>
                    {flag ? (
                        <>
                            {profiles?.length !== 0 ? (
                                profiles?.map((profile) =>
                                    profile.roles[0].id === 1 && profile.enabled ? (
                                        <ProfileInfo
                                            id={profile?.id}
                                            name={profile?.name}
                                            company={profile?.companyName}
                                            role={profile?.roles[0]?.id}
                                            image={
                                                userService.imageLink +
                                                profile?.cv?.image
                                            }
                                        />
                                    ) : (
                                        profile.roles[0].id === 3 &&
                                        profile.enabled && (
                                            <ProfileInfo
                                                id={profile?.id}
                                                name={profile?.name}
                                                company={profile?.companyName}
                                                role={profile?.roles[0]?.id}
                                                image={
                                                    userService.imageLink +
                                                    profile?.company?.companyImage
                                                }
                                            />
                                        )
                                    )
                                )
                            ) : (
                                <h1>No Result</h1>
                            )}
                        </>) : loading && (<CircularProgress />)}
                </div>
            </>) : (
                <>
                    <div className={styles.sidebarNav}>
                        <div className={styles.infos}>
                            <h4>{name}</h4>
                            <h6>Mobile • 3h ago</h6>
                        </div>
                        <div className={styles.actions}>
                            <IconButton aria-label="Delete" color="secondary" >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton aria-label="More" >
                                <MoreHorizIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className={styles.infos1}>
                        <Avatar alt={name} className={styles.avatar} src={userService.imageLink + img} />
                        <h2>{name} <span> · {id}st</span></h2>
                        <h6>DevOps Engineer at AB Conseils</h6>
                    </div>
                    <div className={styles.separator}>{date}</div>
                    <div className={styles.feed} ref={feed} onScroll={handleScroll}>
                        {
                            top && (<IconButton className={styles.top} onClick={handleTop} aria-label="delete">
                                <ArrowUpwardIcon size="medium" />
                            </IconButton>)
                        }

                        {messages != "Friendship not found" && messages?.map((message) => {
                            return message.senderId == id ? (<div className={styles.singleMessage}>
                                <Avatar alt={name} className={styles.avatar} src={userService.imageLink + img} />
                                <h6>{message.message}</h6>
                                <IconButton aria-label="More" >
                                    <MoreHorizIcon />
                                </IconButton>
                            </div>) : (
                                <div className={`${styles.singleMessage} ${styles.mine}`}>
                                    <IconButton onClick={() => { deleteMessage(message.id) }} aria-label="Delete" color="secondary" >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="More" >
                                        <MoreHorizIcon />
                                    </IconButton>
                                    <h6>{message.message}</h6>
                                </div>
                            )

                        })}
                    </div>
                    <div className={styles.message}>
                        <TextareaAutosize placeholder="Write a message" onKeyPress={(e) => e.key === 'Enter' && sendMessage()} value={messagex} onChange={handleChange} rowsMin="2" rowsMax="2" />
                        <div className={styles.footer}>
                            <div className={styles.types}>
                                <IconButton aria-label="File" >
                                    <AttachFileIcon />
                                </IconButton>
                                <IconButton aria-label="Image" >
                                    <ImageIcon />
                                </IconButton>
                                <IconButton aria-label="Gif" >
                                    <GifIcon />
                                </IconButton>
                                <IconButton aria-label="Gif" >
                                    <EmojiEmotionsIcon />
                                </IconButton>
                                <IconButton aria-label="Videos" >
                                    <VideoCallIcon />
                                </IconButton>
                            </div>
                            <div className={styles.actions1}>
                                <Button
                                    onClick={sendMessage}
                                    variant="contained"
                                    color="primary"
                                    disabled={loading2}
                                    endIcon={<SendIcon />}
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>

                </>)}

        </div>
    )
}

export default Feed
