import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, role, children }) => {
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
