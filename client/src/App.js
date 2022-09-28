import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../src/actions/UserFetch";
import { Navigate } from "react-router-dom";
import Workspace from "./components/Workspace";

const App = () => {
  const userID = localStorage.userID;
  const dispatch = useDispatch();
  useEffect(() => {dispatch(fetchUser(userID))}
  , [])
  if (!localStorage.token) {
    return <Navigate to="/login" />;
  }

  return <Workspace />;
};

export default App;
