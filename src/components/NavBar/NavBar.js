import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="main-navigation">
      <h1 className="main-title">
        <Link to="/">Pokedex</Link>
      </h1>
      <ul className="main-navigation-list">
        <li className="main-navigation-item">
          <NavLink to="/pokemon-table">Pokemon Table</NavLink>
        </li>
        <li className="main-navigation-item">
          <NavLink to="/pokemon-create">Add new Pokemon</NavLink>
        </li>
      </ul>
    </nav>
  );
};
