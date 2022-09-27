import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Workspace from "./components/Workspace";
// import Login from "./components/Login";
// import Header from "./components/Header";
// import Display from "./components/Display";

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
  

  // if (isLoggedIn) {
  //   return (
  //     <div className="container">
  //       <Header />
  //       <Display />
  //     </div>
  //   );
  // }
  // return (
  //   <Login />
  // )
};

export default App;
