import React from "react";
import ReactModal from "react-modal";
import { Navigate } from "react-router-dom";
import Workspace from "./components/Workspace";

ReactModal.defaultStyles.overlay.zIndex = "5";

const App = () => {

  if (!localStorage.token) {
    return <Navigate to="/login" />;
  }

  return <Workspace />;
};

export default App;
