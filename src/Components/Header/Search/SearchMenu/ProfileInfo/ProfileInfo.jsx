import React from "react";
import "./ProfileInfo.css";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function ProfileInfo({ id, name, company, role, image, username }) {
  const history = useHistory();
  const handleClick = () => {
    history.push("/view/" + id);
    window.location.reload();
  };
  function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words?.toLowerCase().split(" ");
    for (var i = 0; i < separateWord?.length; i++) {
      separateWord[i] =
        separateWord[i]?.charAt(0).toUpperCase() +
        separateWord[i]?.substring(1);
    }
    return separateWord?.join(" ");
  }

  return (
    <div className="profile_info" onClick={handleClick}>
      {role == 1 ? (
        <Avatar className="image" src={image} />
      ) : (
        <Avatar className="image square" src={image} />
      )}

      {role === 1 && (
        <h5>
          {capitalizeTheFirstLetterOfEachWord(name)} - <span>@{username}</span>{" "}
          - <span>Etudiant</span>
        </h5>
      )}
      {role === 3 && (
        <h5>
          {capitalizeTheFirstLetterOfEachWord(company)} -{" "}
          <span>@{username}</span>- <span>Entreprise</span>
        </h5>
      )}
    </div>
  );
}

export default ProfileInfo;
