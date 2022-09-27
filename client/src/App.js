import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Card from "./components/Card";

const App = () => {
  const isLoggedIn = useSelector((state) => state.reducer.isLoggedIn);

  if (!localStorage.token) {
    return <Navigate to="/login" />;
  }

  return <Card />;
};

export default App;
