import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../api/axios";
import { RESERVATIONS, ROOM_TYPES } from "../../api/endpoints";
import { config } from "../../api/config";

import ReservationCard from "./ReservationCard";
import Loading from "../loading/Loading";
import Modal from "../modal/Modal";
import "./Reservation.css";

/**
 * Reservations component.
 * Displays all reservations and allows for creating, editing, and deleting a reservation.
 */
const Reservations = () => {
  // Enable navigation to other pages
  const navigate = useNavigate();

  /**
   * State variables to manage reservations, room types and loading state and modal state.
   */
  const [reservations, setReservations] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Fetches the reservations and room types data from the api.
   * Updates the state variables with the fetched data.
   */
  useEffect(() => {
    Promise.all([
      axios.get(RESERVATIONS, config()),
      axios.get(ROOM_TYPES, config()),
    ])
      .then(([reservationsResponse, roomTypesResponse]) => {
        setReservations(reservationsResponse.data);
        setRoomTypes(roomTypesResponse.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  /**
   * Navigates to the CreateReservation page.
   */
  const createHandler = () => {
    navigate(`${RESERVATIONS}/create`);
  };

  /**
   * Navigates to the EditReservation page.
   * @param {string} id - The id of the reservation to edit.
   */
  const editHandler = (id) => {
    navigate(`${RESERVATIONS}/edit/${id}`);
  };

  /**
   * Deletes a reservation.
   * @param {string} id - The id of the reservation to delete.
   */
  const deleteHandler = (id) => {
    axios
      .delete(`${RESERVATIONS}/${id}`, config())
      .then(() => {
        setReservations((prevReservations) =>
          // Filter out the deleted reservation
          prevReservations.filter((reservation) => reservation.id !== id)
        );
      })
      .catch(() => {
        setIsModalOpen(true);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
          <h1 className="reservations-title">All Reservations</h1>
          <div className="create-btn-container">
            <button className="create-btn" onClick={createHandler}>
              Create
            </button>
          </div>
          <div className="cards-container">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                roomType={roomTypes.find(
                  // Find the room type that matches the reservation's room type id
                  (type) => type.id === reservation.roomTypeId
                )}
                onClickEdit={() => editHandler(reservation.id)}
                onClickDelete={() => deleteHandler(reservation.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
