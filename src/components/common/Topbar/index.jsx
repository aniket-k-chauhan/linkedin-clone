import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsBriefcase, BsPeople } from "react-icons/bs";

import LinkedinLogo from "../../../assets/linkedinLogo.png";
import ProfilePopup from "../ProfilePopup";
import "./index.scss";
import { useCurrentUser } from "../../../helpers/CurrentUserContext";
import { getCurrentUserImage } from "../../../helpers/getCurrentUserImage";
import SearchInput from "../SearchInput";
import { getAllUsers } from "../../../api/FirestoreAPI";

export default function Topbar() {
  let navigate = useNavigate();
  const currentUser = useCurrentUser();

  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getAllUsers(setAllUsers);
  }, []);

  // debounce fun
  useEffect(() => {
    let debounce = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchedText]);

  const handleSearch = () => {
    if (searchedText !== "") {
      let filterResult = allUsers.filter((user) => {
        // to search in whole user information
        // return Object.values(user)
        //   .toLowerCase()
        //   .includes(searchedText.toLowerCase());

        // to search name in user Info
        return user.name.toLowerCase().includes(searchedText.toLowerCase());
      });

      setFilteredUsers(filterResult);
    } else {
      setFilteredUsers(allUsers);
    }
  };

  const handleSearchResultClick = (user) => {
    navigate("/profile", { state: { email: user.email } });
  };

  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
      <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
      {isSearching ? (
        <SearchInput
          setIsSearching={setIsSearching}
          setSearchedText={setSearchedText}
        />
      ) : (
        <div className="react-icons">
          <AiOutlineSearch
            size={20}
            className="react-icon"
            onClick={() => setIsSearching(true)}
          />
          <AiOutlineHome
            size={25}
            className="react-icon"
            onClick={() => goToRoute("/home")}
          />
          <BsPeople
            size={25}
            className="react-icon"
            onClick={() => goToRoute("/connection")}
          />
          <BsBriefcase size={25} className="react-icon" />
          <AiOutlineMessage size={25} className="react-icon" />
          <AiOutlineBell size={25} className="react-icon" />
        </div>
      )}
      <img
        className="user-image"
        src={getCurrentUserImage(currentUser)}
        alt="user"
        onClick={displayPopup}
      />
      {searchedText.length !== 0 ? (
        <div className="search-result-container">
          {filteredUsers.length === 0 ? (
            <div className="search-result-user">No match found</div>
          ) : (
            filteredUsers.map((user) => {
              return (
                <div
                  className="search-result-user"
                  onClick={() => handleSearchResultClick(user)}
                >
                  <img
                    className="search-result-user-image"
                    src={getCurrentUserImage(user)}
                    alt="profile-image"
                  />
                  <p className="search-result-user-name">{user.name}</p>
                  <span className="info-separator">•</span>
                  <p className="search-result-user-headline">{user.headline}</p>
                </div>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
