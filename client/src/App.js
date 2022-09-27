import { useSelector } from "react-redux";
import Login from "./components/Login";
import Header from "./components/Header";
import Display from "./components/Display";

const App = () => {
  const isLoggedIn = useSelector(state => state.reducer.isLoggedIn);

  if (isLoggedIn) {
    return (
      <div className="container">
        <Header />
        <Display />
      </div>
    );
  }
  return (
    <Login />
  )
}

export default App;
