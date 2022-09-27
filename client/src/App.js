import { useSelector } from "react-redux";
import Login from "./components/Login";

const App = () => {
  const isLoggedIn = useSelector(state => state.reducer.isLoggedIn);

  if (isLoggedIn) {
    return (
      <div className="container">
        Placeholder
      </div>
    );
  }
  return (
    <Login />
  )
}

export default App;
