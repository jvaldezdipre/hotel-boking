import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/" />;
};

export default Logout;
