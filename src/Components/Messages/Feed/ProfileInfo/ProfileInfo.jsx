import React from "react";
import styles from "./ProfileInfo.module.css";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function ProfileInfo({ id, name, company, role, image }) {
  const history = useHistory();
  const handleClick = () => {
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
    <div className={styles.profile_info} onClick={handleClick}>
      {role == 1 ? (
        <Avatar className={styles.image} src={image} />
      ) : (
        <Avatar className={`${styles.image} ${styles.square}`} src={image} />
      )}

      {role === 1 && (
        <h5>
          {capitalizeTheFirstLetterOfEachWord(name)} - <span>Etudiant</span>
        </h5>
      )}
      {role === 3 && (
        <h5>
          {capitalizeTheFirstLetterOfEachWord(company)} -{" "}
          <span>Entreprise</span>
        </h5>
      )}
    </div>
  );
}

export default ProfileInfo;
