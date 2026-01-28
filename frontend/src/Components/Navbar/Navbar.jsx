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
            <NavLink to="/create">Create </NavLink>
          </li>
          <li>
            <NavLink to={`/note-details`}>Details </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
