import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import ProtectedRoute from "../protected-route/ProtectedRoute";
import Login from "../login/Login";
import Logout from "../logout/Logout";
import NavBar from "../nav-bar/NavBar";
import Reservations from "../reservations/Reservations";
import RoomTypes from "../room-types/RoomTypes";
import CreateReservation from "../reservations/CreateReservation";
import EditReservation from "../reservations/EditReservation";
import CreateRoomType from "../room-types/CreateRoomType";
import EditRoomType from "../room-types/EditRoomType";
import NotFound from "../not-found/NotFound";
import Loading from "../loading/Loading";
import "./App.css";

/**
 * Main application component.
 *
 * Routes to different areas of the application based on the user's role and login status.
 * Checks if the user is logged in and sets the user's role and email.
 */
const App = () => {
  const token = sessionStorage.getItem("token");

  /**
   * State variables to manage login status, user role, user email, and loading state.
   */
  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Effect hook to handle token and set user role and email.
   */
  useEffect(() => {
    if (token) {
      const role = jwtDecode(token).roles;
      const email = jwtDecode(token).sub;
      setUserRole(role);
      setUserEmail(email);
      loginHandler();
    }
    setLoading(false);
  }, [token]);

  /**
   * Handler function to set the user role based on the decoded token.
   * @param {string} decodedToken - The decoded token containing user role information.
   */
  const userRoleHandler = (decodedToken) => {
    setUserRole(jwtDecode(decodedToken).roles);
  };

  /**
   * Handler function to set the logged in status to true.
   */
  const loginHandler = () => {
    setLoggedIn(true);
  };

  // const loadingHandler = (condition) => {
  //   setLoading(condition);
  // };

  /**
   * Handler function to set the logged in status to false and remove the token from session storage.
   */
  const logoutHandler = () => {
    loggedIn && setLoggedIn(false);
    sessionStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <NavBar loggedIn={loggedIn} role={userRole} />
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Login login={loginHandler} userRoleHandler={userRoleHandler} />
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
            path="/room-types"
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
          <Route
            path="/logout"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Logout logout={logoutHandler} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations/create"
            element={
              <ProtectedRoute loggedIn={loggedIn} role={userRole}>
                <CreateReservation user={userEmail} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations/edit/:id"
            element={
              <ProtectedRoute loggedIn={loggedIn} role={userRole}>
                <EditReservation user={userEmail} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room-types/create"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                role={userRole}
                roleRequired="manager"
              >
                <CreateRoomType />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room-types/edit/:id"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                role={userRole}
                roleRequired="manager"
              >
                <EditRoomType />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
