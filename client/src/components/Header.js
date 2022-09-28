import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from '../actions/Logout'
import React from 'react'

const Header = () => {
  const name = useSelector(state => state.reducer.user.organization[0].orgName);
  const dispatch = useDispatch()
  const handleLogoutClick = () => {
    dispatch(handleLogout())
  }
  return (
    <nav className="navbar">
      <div className="container-fluid"> 
        <div className="navbar-brand">{name}`&apos;`s Boards</div>
        <button type="button" onClick={handleLogoutClick}>Logout</button>

      </div>
    </nav>
  )
};

export default Header;
