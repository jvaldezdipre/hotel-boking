import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../api/axios";
import { ROOM_TYPES } from "../../api/endpoints";
import { config } from "../../api/config";

import RoomTypeCard from "./RoomTypeCard";

const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(ROOM_TYPES, config())
      .then((response) => {
        console.log("Got the room types", response.data);
        setRoomTypes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const createHandler = () => {
    navigate(`${ROOM_TYPES}/create`);
  };

  const editHandler = (id) => {
    navigate(`${ROOM_TYPES}/edit/${id}`);
  };
  return (
    <div>
      <h1>All Room types</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button className="create-btn" onClick={createHandler}>
            Create
          </button>
          {roomTypes.map((roomType) => (
            <RoomTypeCard
              key={roomType.id}
              roomType={roomType}
              onClickEdit={() => editHandler(roomType.id)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default RoomTypes;
