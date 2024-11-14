import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ loggedIn, role }) => {
  return (
    <nav className="nav-bar">
      <h2>Hotel Bookings</h2>

      <ul className="nav-links-container">
        {loggedIn && (
          <>
            {role === "manager" ? (
              <>
                <li>
                  <NavLink
                    to="/reservations"
                    className={({ isActive }) =>
                      isActive ? "link active" : "link"
                    }
                  >
                    Reservations
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/room-types"
                    className={({ isActive }) =>
                      isActive ? "link active" : "link"
                    }
                  >
                    Room Types
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/reservations"
                  className={({ isActive }) =>
                    isActive ? "link active" : "link"
                  }
                >
                  Reservations
                </NavLink>
              </li>
            )}
            <li>
              <Link to="/logout" className="link">
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
