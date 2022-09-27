import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Workspace from "./components/Workspace";

const App = () => {
  const isLoggedIn = useSelector(state => state.reducer.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <Navigate to="/login" />
    );
  }

  return (
    <Workspace />
  );
};

export default App;
