import React, { useEffect, useState, initialState } from "react";
import { Redirect } from "react-router-dom";
import SetCompany from "./SetProfile/SetCompany/SetCompany";
import userService from "../../services/userService";

export default function CompanyProfile(props) {
  const user = props?.user;
  const id = user?.id;
  const [flag, setFlag] = useState(initialState);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    async function getUserData() {
      await userService.getUserData().then((response) => {
        setFlag(response?.data?.company?.flag);
        setLoaded(true);
      });
    }
    getUserData();
  }, []);

  return (
    <div className="body">
      {loaded &&
        (flag ? <Redirect to={"/view/" + id} /> : <SetCompany user={user} />)}
    </div>
  );
}
