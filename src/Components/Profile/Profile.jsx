import React from "react";
import { Redirect } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import CompanyProfile from "./CompanyProfile";

export default function Profile(props) {
  const user = props.user;
  const role = user?.roles[0]?.id;

  return (
    <div className="container" style={{ minWidth: "100%", maxHeight: "100%" }}>
      <div className="row">
        <div className="col-12">
          {role === 1 && <StudentProfile user={user} />}
          {role === 2 && <Redirect to="/admin" />}
          {role === 3 && <CompanyProfile user={user} />}
        </div>
      </div>
    </div>
  );
}
