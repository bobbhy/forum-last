import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Feed from "./Feed/Feed";
import Sidebarl from "./Sidebarl/Sidebarl";

function Home(props) {
  const image = props?.image;
  const user = props?.user;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Sidebar image={image} user={user} />
      <Feed image={image} user={user} refreshHome={props?.refreshHome} />
      <Sidebarl />
    </div>
  );
}

export default Home;
