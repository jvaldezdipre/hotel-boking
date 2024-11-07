import { Navigate } from "react-router-dom";

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
