import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import HeaderBuffer from "./HeaderBuffer";

const BoardViewLayout = () => {

  return (
    <div>
      <Header />
      <HeaderBuffer />
      <Outlet />
    </div>
  )
};

export default BoardViewLayout;
