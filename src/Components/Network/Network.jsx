import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Feed from "./Feed/Feed";

function Home(props) {
  const image = props?.image;
  const user = props?.user;
  return (
    <>
      <Sidebar image={image} user={user} />
      <Feed user={user} />
    </>
  );
}

export default Home;
