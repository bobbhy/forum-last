import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Feed from "./Feed/Feed";
import Sidebarl from "./Sidebarl/Sidebarl";
import Snackbar from "@material-ui/core/Snackbar";
import { Link } from "react-router-dom";
import userService from "../../services/userService";

function Home(props) {
  const image = props?.image;
  const user = props?.user;
  const [isReported, setIsReported] = useState(false);
  useEffect(() => {
    userService.getIsReported().then((res) => {
      setIsReported(res?.data);
    });
  }, []);
  const [state, setState] = useState({
    open: true,
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

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
      {user?.roles[0]?.id == 2 && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          message={
            <Link
              to="/admin"
              style={{ fontFamily: "Calibri", fontSize: "16px", color: "#fff" }}
            >
              Retourner au Dashboard
            </Link>
          }
          key={vertical + horizontal}
        />
      )}
      {user?.roles[0]?.id != 2 && isReported && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          message={"Un administrateur vous a envoyé un avertissement"}
          key={vertical + horizontal}
        />
      )}
    </div>
  );
}

export default Home;
