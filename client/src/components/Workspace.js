import React, { useEffect } from "react";
import Header from "./Header";
import Display from "./Display";
import { useNavigate } from "react-router-dom";
// import Card from "./Card";

const Workspace = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/b/6333499197311dc26cfff7a0");
  };

  return (
    <div className="container-fluid">
      <Header />
      <Display />
      {/* <Card /> */}
      {/* This is just for testing BoardView */}
      <button onClick={handleClick}>To BoardView</button>
    </div>
  );
};

export default Workspace;
