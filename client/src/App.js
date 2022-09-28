import React from "react";

import { Navigate } from "react-router-dom";
import Workspace from "./components/Workspace";

const App = () => {

  if (!localStorage.token) {
    return <Navigate to="/login" />;
  }

  return <Workspace />;
};

export default App;
