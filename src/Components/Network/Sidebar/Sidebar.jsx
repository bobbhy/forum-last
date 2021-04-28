import { Avatar } from '@material-ui/core'
import React from 'react'
import styles from './Sidebar.module.css'
import PeopleIcon from '@material-ui/icons/People';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import EventSharpIcon from '@material-ui/icons/EventSharp';
import BusinessSharpIcon from '@material-ui/icons/BusinessSharp';
function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words?.toLowerCase().split(' ');
    for (var i = 0; i < separateWord?.length; i++) {
        separateWord[i] = separateWord[i]?.charAt(0).toUpperCase() +
            separateWord[i]?.substring(1);
    }
    return separateWord?.join(' ');
}
function Sidebar({ image, user }) {
    const recentItem = (topic) => (
        <div className="sidebar_recentItem">
            <div className="sidebar_hash">#</div>
            <p>{topic}</p>
        </div>
    );
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_stats}>
                <h1>Manage My Network</h1>
                <div className={styles.sidebar_stat}>
                    <p><PeopleIcon /> <span> Connections</span></p>
                    <p className={styles.sidebar_statNumber}>{user?.friendshipSended.length + user?.friendshipReceived.length}</p>
                </div>
                <div className={styles.sidebar_stat}>
                    <p><VisibilityIcon /> <span> Profile's views</span></p>
                    <p className={styles.sidebar_statNumber}>{Math.floor(Math.random() * 1000)}</p>
                </div>
                <div className={styles.sidebar_stat}>
                    <p><PersonAddSharpIcon /><span>People I follow</span></p>
                    <p className={styles.sidebar_statNumber}>{Math.floor(Math.random() * 20)}</p>
                </div>
                <div className={styles.sidebar_stat}>
                    <p><PeopleSharpIcon /> <span>Groups</span></p>
                    <p className={styles.sidebar_statNumber}>{Math.floor(Math.random() * 20)}</p>
                </div>
                <div className={styles.sidebar_stat}>
                    <p><EventSharpIcon /><span>Events</span></p>
                    <p className={styles.sidebar_statNumber}></p>
                </div>
                <div className={styles.sidebar_stat}>
                    <p><BusinessSharpIcon /><span>Companies</span></p>
                    <p className={styles.sidebar_statNumber}>{Math.floor(Math.random() * 100)}</p>
                </div>
            </div>
            <div className="sidebar_bottom">
                <p>Recent</p>
                {recentItem("Reactjs")}
                {recentItem("Programming")}
                {recentItem("SoftwareEngineering")}
                {recentItem("Design")}
                {recentItem("Developer")}
            </div>

        </div>
    )
}

export default Sidebar

