import { NavLink, Link } from "react-router-dom";

const NavBar = ({ loggedIn, role }) => {
  return (
    <nav className="nav-bar">
      <h3>Hotel Bookings</h3>

      <ul className="nav-links-container">
        {loggedIn && role === "employee" && (
          <>
            <li>
              <NavLink to="/reservations">Reservations</NavLink>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
