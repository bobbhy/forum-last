import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import userService from "../../../services/userService";
import "./Sidebar.css";

function Sidebar({ image, user }) {
  const recentItem = (topic) => (
    <div className="sidebar_recentItem">
      <div className="sidebar_hash">#</div>
      <p>{topic}</p>
    </div>
  );
  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <img src="https://picsum.photos/seed/picsum/400/200" alt="" />
        {user?.roles[0]?.id === 1 ? (
          <Avatar
            src={
              userService.imageLink + user?.cv?.image
            }
            className="sidebar_avatar"
            alt={`Image of ${user?.name}`}
          />
        ) : (
          <Avatar
            src={
              userService.imageLink +
              user?.company?.companyImage
            }
            className="sidebar_avatar"
            variant="square"
            alt={`Image of ${user?.name}`}
          />
        )}
        <h2>
          {user?.roles[0]?.id === 1 &&
            user?.cv?.about?.firstName + " " + user?.cv?.about?.lastName}
          {user?.roles[0]?.id === 3 &&
            user?.name
              .split(" ")
              .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
              .join(" ") +
            " - " +
            user?.company?.aboutCompany?.name}
        </h2>
        <h5>{user?.email}</h5>
      </div>
      <div className="sidebar_stats">
        <div className="sidebar_stat">
          <p>Connections</p>
          <p className="sidebar_statNumber">0</p>
        </div>
        <div className="sidebar_stat">
          <p>Profile's views</p>
          <p className="sidebar_statNumber">1223</p>
        </div>
      </div>
      <div className="sidebar_bottom">
        <p>Recent</p>
        {user?.roles[0]?.id === 1 &&
          user?.cv?.devLanguages
            .slice(0, Math.floor(user?.cv?.devLanguages?.length / 2))
            .map((e) => recentItem(e.name))}
        {user?.roles[0]?.id === 3 && recentItem(user.companyName)}
        {recentItem("Programming")}
        {recentItem("SoftwareEngineering")}
        {recentItem("Design")}
        {recentItem("Developer")}
      </div>
    </div>
  );
}

export default Sidebar;
