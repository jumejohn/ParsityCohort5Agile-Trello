import { useSelector } from "react-redux";

const Header = () => {
  const name = useSelector(state => state.reducer.user.firstname);

  return (
    <nav className="navbar">
      <div className="container-fluid"> 
        <div className="navbar-brand">{name}'s Boards</div>
        <button type="button">Logout</button>
      </div>
    </nav>
  )
};

export default Header;
