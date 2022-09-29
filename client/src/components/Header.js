import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from '../actions/Logout'
import React from 'react'
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
          <div className="navbar-brand">{name.organization.orgName}&apos;s Boards</div>
          <button type="button" onClick={handleLogoutClick}>Logout</button>

        </div>
      </nav>
    )}
  else {
    <></>
  }
};

export default Header;
