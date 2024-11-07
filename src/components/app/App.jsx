import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Login from "../login/Login";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import Reservations from "../reservations/Reservation";
import "./App.css";
import NavBar from "../nav-bar/NavBar";
import RoomTypes from "../room-types/RoomTypes";

const App = () => {
  const token = sessionStorage.getItem("token");

  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const role = jwtDecode(token).roles;
      setUserRole(role);
      loginHandler();
    }
    setLoading(false);
  }, [token]);

  const loginHandler = () => {
    setLoggedIn(true);
  };

  const userRoleHandler = (decodedToken) => {
    setUserRole(jwtDecode(decodedToken).roles);
  };

  return (
    <BrowserRouter>
      <NavBar loggedIn={loggedIn} role={userRole} />
      {loading ? (
        <div>
          <h1>loading...</h1>
        </div>
      ) : (
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
          <Route
            path="room-types"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                role={userRole}
                roleRequired="manager"
              >
                <RoomTypes />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
