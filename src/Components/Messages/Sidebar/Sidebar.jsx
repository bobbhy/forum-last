import React, { useState, useEffect } from 'react'
import styles from './Sidebar.module.css'
import IconButton from '@material-ui/core/IconButton';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MessageConversation from './MessageConversation/MessageConversation';
import userService from "../../../services/userService"
function Sidebar({ forceId, data, setActive, NewConversation }) {
    const [activeId, setActiveId] = useState("")
    useEffect(() => {
        if (forceId) {
            console.log("ok")
            setActiveId(forceId)

        }
    }, [activeId])
    const handleClick = (id) => {
        setActiveId(id)
        const current = data.find(conversation => { return (conversation.id == id) })
        setActive(id, current?.username, current?.date, current?.img)
    }
    const NewConversationx = () => {
        NewConversation()
        setActiveId(0)
    }
    return (
        <div className={styles.container}>
            <div className={styles.sidebarNav}>
                <h3>Messaging</h3>
                <div className={styles.actions}>
                    <IconButton onClick={NewConversationx} aria-label="New" >
                        <BorderColorIcon />
                    </IconButton>
                    <IconButton aria-label="More" >
                        <MoreHorizIcon />
                    </IconButton>
                </div>
            </div>
            {
                data.map((conversation, index) => {
                    const date = new Date(conversation.date)
                    const dt = date.toLocaleDateString()
                    return (
                        <MessageConversation id={conversation.id} onClick={() => { handleClick(conversation.id) }} isActive={activeId === conversation.id} name={conversation.username} message={conversation.lastMessage.message} lastDate={dt} image={userService.imageLink + conversation.img} />
                    )
                })
            }



        </div>
    )
}

export default Sidebar
