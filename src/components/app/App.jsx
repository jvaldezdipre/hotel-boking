import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../login/Login";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import Reservations from "../reservations/Reservation";
import "./App.css";
import NavBar from "../nav-bar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <Reservations />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
