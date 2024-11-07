import { NavLink, Link } from "react-router-dom";

const NavBar = ({ loggedIn, role }) => {
  return (
    <nav className="nav-bar">
      <h3>Hotel Bookings</h3>

      <ul className="nav-links-container">
        {(loggedIn && role === "employee") ||
          (role === "manager" && (
            <>
              <li>
                <NavLink to="/reservations">Reservations</NavLink>
              </li>
              {loggedIn && role === "manager" && (
                <li>
                  <NavLink to="/room-types">Room Types</NavLink>
                </li>
              )}
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ))}
      </ul>
    </nav>
  );
};

export default NavBar;
