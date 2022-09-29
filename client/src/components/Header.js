import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { handleLogout } from '../actions/Logout';
import { fetchUser } from "../actions/UserFetch";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = localStorage.token;
  useEffect(() => {dispatch(fetchUser(token))}
  , [])

  const name = useSelector(state => state.rootReducer.user.currentUser);
  console.log("headerstate", name)

  const handleLogoutClick = () => {
    dispatch(handleLogout(() => {
      navigate('/login')
    }));
  }
  
  if(name){ 
    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand">
            <Link to="/" style={linkStyle}>{name.organization.orgName}</Link>
            &apos;s Boards
            </div>
          <button type="button" onClick={handleLogoutClick}>Logout</button>

        </div>
      </nav>
    )}
  else {
    <></>
  }
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

export default Header;
