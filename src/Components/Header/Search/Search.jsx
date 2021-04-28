import React, { useState, initialState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import "./Search.css";
import userService from "../../../services/userService";

function Search({ children }) {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(initialState);
  const [profiles, setProfiles] = useState([]);
  const [flag, setFlag] = useState(false);
  const handleSearch = (e) => {
    e.target.style.marginLeft = "20px";
    setOpen(!open);
  };
  const handleClose = (e) => {
    setOpen(!open);
    setProfiles([]);
    setKey("");
    setFlag(false);
  };
  const handleChange = (e) => {
    if (key) {
      setOpen(true);
    }
    const keyx = e.target.value;
    setKey(keyx);
    if (keyx) {
      userService.getUsersLike(keyx).then((response) => {
        setProfiles(response.data);
        setFlag(true);
      });
    } else {
      setProfiles([]);
    }
  };
  return (
    <div className="header_search">
      <SearchIcon />
      <input
        value={key}
        id="myInput"
        type="text"
        autocomplete="off"
        onFocus={handleSearch}
        onChange={handleChange}
        placeholder="Search"
      />
      {open && <CloseIcon className="close" onClick={handleClose} />}
      {open && React.cloneElement(children, { profiles, flag, handleClose })}
    </div>
  );
}

export default Search;
