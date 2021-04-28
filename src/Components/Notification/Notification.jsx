import React, { useEffect } from "react";
import Sidebar from "../Home/Sidebar/Sidebar"
import Feed from "./Feed/Feed";
import { useHistory } from "react-router-dom";


function Home(props) {
    const history = useHistory();
    const image = props?.image;
    const user = props?.user;
    return (
        <>
            <Sidebar image={image} user={user} />
            <Feed />
        </>
    );
}

export default Home;