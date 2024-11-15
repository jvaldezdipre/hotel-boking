import { useEffect } from "react";
import { Navigate } from "react-router-dom";

/**
 * Logout component.
 * Logs out the user and navigates to the login page.
 * @param {Object} props - logout function.
 */
const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/" />;
};

export default Logout;
