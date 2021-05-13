import React, { useState, useEffect, initialState } from "react";
import "./Header.css";
import { useTheme } from "@material-ui/core/styles";
import HeaderOption from "./HeaderOption/HeaderOption";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DropdownMenu from "./HeaderOption/DropdowMenu/DropdownMenu";
import Search from "./Search/Search";
import SearchMenu from "./Search/SearchMenu/SearchMenu";
import userService from "../../services/userService";
import logo from "../../logo.png";

function Header({ image, onChange, refreshHome }) {
  const [user, setUser] = useState(initialState);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function getUserData() {
      await userService.getUserData().then((response) => {
        setUser(response?.data);
      });
    }
    getUserData();
  }, [count]);
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };
  const handleSearch = (e) => {
    e.target.style.marginLeft = "20px";
  };
  const handleNotif = () => {
    try {
      userService.handleNotif();
      setCount(count + 1);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  const badge = user?.notifications.filter((x) => x.status === false).length;
  return (
    <div className="header">
      <div className="header_left align-items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        {/* SearchIcon */}
        {user && !isMobile && (
          <Search>
            <SearchMenu />
          </Search>
        )}
      </div>
      <div className="header_right align-items-center" id="myDiv">
        {user ? (
          <>
            <HeaderOption
              Icon={HomeIcon}
              title="Home"
              isMobile={isMobile}
              onClick={() => {
                handleNotif();
                onChange(!refreshHome);
              }}
            />
            <HeaderOption
              Icon={SupervisorAccountIcon}
              title="MyNetwork"
              isMobile={isMobile}
              onClick={handleNotif}
            />
            <HeaderOption
              Icon={ChatIcon}
              title="Messages"
              isMobile={isMobile}
              onClick={handleNotif}
            />
            <HeaderOption
              Icon={NotificationsIcon}
              title="Notifications"
              isMobile={isMobile}
              badge={badge}
              onClick={handleNotif}
            />
            <HeaderOption
              image={
                user?.roles[0]?.id === 1
                  ? userService.imageLink + user?.cv?.image
                  : userService.imageLink + user?.company?.companyImage
              }
              className="wrapper button"
              title={"@" + user?.username.split(" ")[0]}
              titleIcon={<ArrowDropDownIcon />}
              isMobile={isMobile}
            >
              <DropdownMenu image={image} user={user} />
            </HeaderOption>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              className="button"
              onClick={() => handleButtonClick("/login", true)}
            >
              LOG IN
            </Button>
            <Button
              variant="contained"
              className="button"
              onClick={() => handleButtonClick("/register")}
            >
              REGISTER
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
