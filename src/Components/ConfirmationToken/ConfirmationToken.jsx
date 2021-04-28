import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import authService from "../../services/authService";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./ConfirmationToken.css";
import { useHistory } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ConfirmationToken({ userinfo, user }) {
  const history = useHistory();
  const query = useQuery();
  useEffect(() => {
    if (user) {
      history.push("/home");
    }
    const token = query.get("token");
    authService.verify(token).then(() => {
      history.push("/profile");
      window.location.reload();
    });
  }, []);

  return (
    <div className="loader">
      <CircularProgress
        variant="determinate"
        className="circularProgress"
        size={40}
        thickness={4}
        value={100}
      />
      <h1>Redirect...</h1>
    </div>
  );
}

export default ConfirmationToken;
