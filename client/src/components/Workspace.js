import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../actions/UserFetch";
import Header from "./Header";
import Display from "./Display";
import Card from "./Card";

const Workspace = () => {
  const token = localStorage.token;
  const dispatch = useDispatch();
  useEffect(() => {dispatch(fetchUser(token))}
  , [])

  return (
    <div className="container-fluid">
      <Header />
      {/* <Display /> */}
      <Card />
    </div>
  );
};

export default Workspace;
