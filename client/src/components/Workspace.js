import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../actions/UserFetch";
import Header from "./Header";
// import Display from "./Display";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const Workspace = () => {
  const token = localStorage.token;
  const dispatch = useDispatch();
  useEffect(() => {dispatch(fetchUser(token))}
  , [])

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/b/1");
  }

  return (
    <div className="container-fluid">
      <Header />
      {/* <Display /> */}
      <Card />
      {/* This is just for testing BoardView */}
      <button onClick={handleClick}>To BoardView</button>
    </div>
  );
};

export default Workspace;
