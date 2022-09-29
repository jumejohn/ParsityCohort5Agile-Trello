import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from '../actions/Logout';
import { fetchUser } from "../actions/UserFetch";
import HeaderDropDown from './HeaderDropDown';

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = localStorage.token;
  useEffect(() => {dispatch(fetchUser(token))}
  , [])

  const name = useSelector(state => state.rootReducer.user.currentUser);

  const handleLogoutClick = () => {
    dispatch(handleLogout(() => {
      navigate('/login')
    }));
  }

  // const handleOrgClick = () => {
  //   dispatch({type: "RESET_CURRENT_BOARD"});
  // }
  
  if(name){ 
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <div className="navbar-brand">
            <HeaderDropDown name={name.organization.orgName} />
            {/* <Link 
              to="/"
              onClick={handleOrgClick}
              style={linkStyle}>
              {name.organization.orgName}
            </Link>
            &apos;s Boards */}
            </div>
          {/* <ul className="navbar-nav">
            <li className="nav-item"></li>
          </ul> */}
          <button type="button" onClick={handleLogoutClick}>Logout</button>

        </div>
      </nav>
    )}
  else {
    <></>
  }
};

// const linkStyle = {
//   textDecoration: "none",
//   color: "inherit",
// };

export default Header;
