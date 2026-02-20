import { NavLink } from "react-router";
import "./navbar.css";

const Navbar = () => {
  //   const { id } = useParams();
  return (
    <header className="navbar">
      <div>
        <ul>
          <li>
            <NavLink to="/">Home </NavLink>
          </li>
          <li>
            <NavLink to="/">Logs </NavLink>
          </li>
          <li>
            <NavLink to={`/`}>Trends </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
