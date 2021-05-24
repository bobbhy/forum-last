import React, { useEffect, useState, useRef } from "react";
import "./DropdownMenu.css";
import { CSSTransition } from "react-transition-group";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { withRouter, useHistory } from "react-router-dom";
import authService from "../../../../services/authService";
import userService from "../../../../services/userService";
const toUpperCaseEachWord = (mySentence) => {
  const words = mySentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
};

function DropdownMenu({ image, user }) {
  const history = useHistory();
  const handleLogin = (pageURL, logout) => {
    if (logout) authService.logout();
    history.push(pageURL);
    window.location.reload();
  };
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <div className="menu_header">
            <Avatar
              className="menu_headerLogo"
              src={
                user?.roles[0]?.id === 1
                  ? userService.imageLink +
                  user?.cv?.image
                  : userService.imageLink +
                  user?.company?.companyImage
              }
            />
            <div className="menu_headerInfo">
              <h2>
                {user?.roles[0]?.id === 1 &&
                  toUpperCaseEachWord(user?.name)}
                {user?.roles[0]?.id === 3 &&
                  toUpperCaseEachWord(user?.companyName)}
              </h2>
              <p>
                {user?.roles[0]?.id === 1 ? "Student" : "Enterprise Manager"}
              </p>
            </div>
            <Button
              variant="outlined"
              onClick={() => handleLogin("/profile", 0)}
              className="menu_headerButton"
              color="primary"
            >
              Voir Profile
            </Button>
          </div>
          <div>
            <Button
              variant="outlined"
              onClick={() => handleLogin("/", 1)}
              className="logoutButton"
              color="secondary"
              startIcon={<ExitToAppIcon />}
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default withRouter(DropdownMenu);
