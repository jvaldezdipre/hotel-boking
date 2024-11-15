import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute component.
 * Protects the route based on the user's login status and role.
 * @param {Object} props - loggedIn, role, roleRequired, children.
 */
const ProtectedRoute = ({ loggedIn, role, roleRequired, children }) => {
  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/reservations" />;
  }

  return children;
};

export default ProtectedRoute;
