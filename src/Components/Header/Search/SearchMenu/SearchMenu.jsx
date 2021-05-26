import React, { useEffect } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Backdrop from "@material-ui/core/Backdrop";
import userService from "../../../../services/userService";
import "./SearchMenu.css";
function SearchMenu(profiles) {
  useEffect(() => {}, [profiles]);
  const close = () => {
    profiles.handleClose();
  };
  return (
    <Backdrop
      style={{ zIndex: 1, marginTop: "70px" }}
      open={profiles.flag}
      onClick={close}
    >
      <div className="searchMenu">
        {profiles?.flag && (
          <div className="profiles">
            {profiles?.profiles?.length !== 0 ? (
              profiles?.profiles?.map((profile) =>
                profile.roles[0].id === 1 && profile.cv.flag ? (
                  <ProfileInfo
                    id={profile?.id}
                    name={profile?.name}
                    company={profile?.companyName}
                    role={profile?.roles[0]?.id}
                    image={userService.imageLink + profile?.cv?.image}
                    username={profile?.username}
                  />
                ) : (
                  profile.roles[0].id === 3 &&
                  profile.company.flag && (
                    <ProfileInfo
                      id={profile?.id}
                      name={profile?.name}
                      company={profile?.companyName}
                      role={profile?.roles[0]?.id}
                      image={
                        userService.imageLink + profile?.company?.companyImage
                      }
                      username={profile?.username}
                    />
                  )
                )
              )
            ) : (
              <h1>Aucun Resultat</h1>
            )}
          </div>
        )}
      </div>
    </Backdrop>
  );
}

export default SearchMenu;
