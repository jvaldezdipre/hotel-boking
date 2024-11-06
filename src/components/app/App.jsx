import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Login from "../login/Login";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import Reservations from "../reservations/Reservation";
import "./App.css";
import NavBar from "../nav-bar/NavBar";

const App = () => {
  const token = sessionStorage.getItem("token");

  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      const role = jwtDecode(token).roles;
      setLoggedIn(true);
      setUserRole(role);
      console.log(role);
      console.log(loggedIn);
    }
  }, []);

  const loginHandler = () => {
    setLoggedIn(true);
  };

  const userRoleHandler = (decodedToken) => {
    setUserRole(jwtDecode(decodedToken).roles);
  };

  return (
    <BrowserRouter>
      <NavBar loggedIn={loggedIn} role={userRole} />
      <Routes>
        <Route
          path="/"
          element={
            <Login
              loginHandler={loginHandler}
              userRoleHandler={userRoleHandler}
            />
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute loggedIn={loggedIn} role={userRole}>
              <Reservations />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
