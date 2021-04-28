import React from 'react'
import SideBar from "../../Sidebar/Sidebar"
import Sidebarl from "../../Sidebarl/Sidebarl"
import SinglePost from "./SinglePost"
function SinglePostMain({ user, image }) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <SideBar image={image} user={user} />
            <SinglePost />
            <Sidebarl />
        </div>
    )
}
export default SinglePostMain
