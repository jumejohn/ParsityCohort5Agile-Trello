import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const name = useSelector(state => state.reducer.user.organization[0].orgName);

  return (
    <nav className="navbar">
      <div className="container-fluid"> 
        <div className="navbar-brand">{name}&apos;s Boards</div>
        <button type="button">Logout</button>
      </div>
    </nav>
  )
};

export default Header;
