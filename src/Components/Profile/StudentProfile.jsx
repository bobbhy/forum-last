import React, { useEffect, useState, initialState } from "react";
import { Redirect } from "react-router-dom";
import SetCv from "./SetProfile//SetCv/SetCv";
import userService from "../../services/userService";

export default function StudentProfile(props) {
  const user = props?.user;
  const id = user?.id;
  const [flag, setFlag] = useState(initialState);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    async function getUserData() {
      await userService.getUserData().then((response) => {
        setFlag(response?.data?.cv?.flag);
        setLoaded(true);
        console.log(response?.data?.cv?.id)
      });
    }
    getUserData();
  }, []);

  return (
    <div>
      {loaded && (flag ? <Redirect to={"/view/" + id} /> : <SetCv user={user} />)}
    </div>
  );
}
