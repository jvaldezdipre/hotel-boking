import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../api/axios";
import { ROOM_TYPES } from "../../api/endpoints";
import { config } from "../../api/config";

import RoomTypeCard from "./RoomTypeCard";
import Loading from "../loading/Loading";
import Modal from "../modal/Modal";

/**
 * RoomTypes component.
 * Displays all room types and allows for creating, editing and deleting a room type.
 */
const RoomTypes = () => {
  // Enable navigation to other pages
  const navigate = useNavigate();

  /**
   * State variables to manage room types, loading state and modal state.
   */
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  /**
   * Fetches the room types data from the api.
   * Updates the room types state with the fetched data.
   */
  useEffect(() => {
    axios
      .get(ROOM_TYPES, config())
      .then((response) => {
        setRoomTypes(response.data);
        setLoading(false);
      })
      .catch(() => {
        setIsModalOpen(true);
        setLoading(false);
      });
  }, []);

  /**
   * Navigates to the create room type page.
   */
  const createHandler = () => {
    navigate(`${ROOM_TYPES}/create`);
  };

  /**
   * Navigates to the edit room type page.
   * @param {number} id - The id of the room type to edit.
   */
  const editHandler = (id) => {
    navigate(`${ROOM_TYPES}/edit/${id}`);
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
          <h1 className="room-types-title">All Room types</h1>
          <div className="create-btn-container">
            <button className="create-btn" onClick={createHandler}>
              Create
            </button>
          </div>
          <div className="cards-container">
            {roomTypes.map((roomType) => (
              <RoomTypeCard
                key={roomType.id}
                roomType={roomType}
                onClickEdit={() => editHandler(roomType.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomTypes;
