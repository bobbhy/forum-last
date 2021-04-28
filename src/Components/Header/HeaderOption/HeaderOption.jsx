import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./HeaderOption.css";
import Badge from "@material-ui/core/Badge";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
  },
}))(Badge);

function HeaderOption({
  image,
  Icon,
  title,
  isMobile,
  titleIcon,
  children,
  badge,
  onClick,
}) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      {!titleIcon && (
        <NavLink
          exact
          to={"/" + title}
          className="headerOption"
          onClick={onClick}
          activeClassName="active"
        >
          <StyledBadge badgeContent={badge} color="secondary">
            {Icon && (
              <Icon
                className={
                  isMobile ? "headerOption_icon2" : "headerOption_icon"
                }
              />
            )}
          </StyledBadge>
          {!Icon && <Avatar className="headerOption_icon" src={image} />}
          {!isMobile && (
            <h5
              onClick={() => {
                setOpen(!open);
              }}
              className="headerOption_title"
            >
              {title}
              {titleIcon}
            </h5>
          )}
          {open && children}
        </NavLink>
      )}
      {titleIcon && (
        <div className="headerOption">
          {Icon && <Icon className="headerOption_icon" />}
          {/* {!Icon && <img src={`data:image/png;base64,${image}`} alt="" />} */}
          {!Icon && (
            <Avatar
              className={"headerOption_icon " + classes.large}
              src={image}
            />
          )}
          <h5
            onClick={() => {
              setOpen(!open);
            }}
            className="headerOption_title"
          >
            {title}
            {titleIcon}
          </h5>
          {open && children}
        </div>
      )}
    </>
  );
}

export default HeaderOption;
