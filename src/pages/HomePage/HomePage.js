import "./HomePage.css";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <section className="home-section">
      <h1 className="home-heading">Welcome</h1>
      <p className="home-paragraph">
        This is a place for viewing, creating , deleting and updating all
        pokemon-related data
      </p>
      <h2 className="home-sub-heading">Here are some useful links: </h2>
      <ul className="home-links">
        <Link to="/pokemon-table">
          <li>View, edit and delete pokemon data</li>
        </Link>
        <Link to="/pokemon-create">
          <li>Add new pokemon data</li>
        </Link>
      </ul>
    </section>
  );
};
