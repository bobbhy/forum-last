import React, { useEffect, useState, useMemo } from 'react'
import styles from './MessageConversation.module.css'
import Avatar from '@material-ui/core/Avatar';
function MessageConversation({ isActive, name, image, message, lastDate, onClick }) {
    const [active, setActive] = useState(false)
    useMemo(() => {
        setActive(isActive ? styles.active : "")
    }, [isActive]);
    return (
        <div onClick={onClick} className={`${styles.container} ${active}`}>
            <Avatar className={styles.avatar} alt={name} src={image} />
            <div className={styles.infos}>
                <h4>{name}</h4>
                <h6>{message}</h6>
                <div className={styles.date}>{lastDate}</div>
            </div>
        </div>
    )
}

export default MessageConversation
