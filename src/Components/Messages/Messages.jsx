import React, { useState, useEffect } from 'react'
import userService from '../../services/userService';
import Feed from './Feed/Feed'
import styles from './Messages.module.css'
import Sidebar from './Sidebar/Sidebar'
import { useParams } from "react-router-dom";

function Messages(props) {
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [img, setImage] = useState("")
    const [id, setId] = useState(-1)
    const [forceId, setForceId] = useState(parseInt(useParams().id))
    const [isNew, setIsNew] = useState(true)
    const handleActive = (id, namex, datex, imgx) => {
        setId(id)
        setName(namex)
        const datexx = new Date(datex)
        const dt = datexx.toLocaleTimeString()
        setDate(dt)
        setImage(imgx)
        setIsNew(false)
        setForceId(false)
    }
    useEffect(() => {
        async function getConversations() {
            await userService.getAllConversations().then((response) => {
                const datax = response.data
                if (forceId) {
                    const current = datax.find(conversation => { return (conversation.id == forceId) })
                    setId(current.id)
                    setName(current?.username)
                    setDate(current?.date)
                    setImage(current.img)
                    setIsNew(false)
                }
                setData(datax);
            },
                (error) => {
                    console.log(error)
                });
        }
        getConversations();
    }, []);
    return (
        <div className={styles.container}>
            <Sidebar forceId={forceId} data={data} NewConversation={() => { setIsNew(true) }} setActive={(id, namex, datex, imgx) => handleActive(id, namex, datex, imgx)} />
            <Feed id={id} isNew={isNew} name={name} date={date} img={img} user={props.user} />
        </div>
    )
}

export default Messages
