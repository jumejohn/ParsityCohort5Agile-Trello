import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../actions/Logout";
import { fetchUser } from "../actions/UserFetch";
import HeaderDropDown from "./HeaderDropDown";
import "../css/Header.css";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.token;
  useEffect(() => {
    dispatch(fetchUser(token));
  }, []);

  const name = useSelector((state) => state.rootReducer.user.currentUser);

  const handleLogoutClick = () => {
    dispatch(
      handleLogout(() => {
        navigate("/login");
      })
    );
  };

  if (name) {
    return (
      <nav className="navbar navbar-dark bg-primary container-fluid">
        <div className="container-fluid">
          <div className="navbar-brand">
            {/* proposed adding in a logo or picture of some kind */}

            <a href="/">
              <img
                src="https://parsity.io/static/parsity-logo-black-3812d8c67256fa0c0285a0589ae81165.png"
                width="200"
              />
            </a>

            <HeaderDropDown name={name.organization.orgName} />
          </div>
          <button type="button" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </nav>
    );
  } else {
    <></>;
  }
};

export default Header;
