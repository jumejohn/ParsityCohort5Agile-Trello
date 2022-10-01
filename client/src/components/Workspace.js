import React from "react";
import Header from "./Header";
import Display from "./Display";
import HeaderBuffer from "./HeaderBuffer";
// import Card from "./Card";

const Workspace = () => {
  return (
    <div className="container-fluid">
      <Header />
      <HeaderBuffer />
      <Display />
    </div>
  );
};

export default Workspace;
