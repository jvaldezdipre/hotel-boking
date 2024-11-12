import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../api/axios";
import { RESERVATIONS, ROOM_TYPES } from "../../api/endpoints";
import { config } from "../../api/config";

import ReservationCard from "./ReservationCard";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    //keeping this might move room type to app.jsx
    // const fetchReservations = () => {
    //   axios
    //     .get(RESERVATIONS, config())
    //     .then((response) => {
    //       console.log(response.data);
    //       setReservations(response.data);
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setLoading(false);
    //     });
    // };
    // fetchReservations();

    Promise.all([
      axios.get(RESERVATIONS, config()),
      axios.get(ROOM_TYPES, config()),
    ])
      .then(([reservationsResponse, roomTypesResponse]) => {
        setReservations(reservationsResponse.data);
        setRoomTypes(roomTypesResponse.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const createHandler = () => {
    navigate(`${RESERVATIONS}/create`);
  };

  const editHandler = (id) => {
    navigate(`${RESERVATIONS}/edit/${id}`);
  };

  const deleteHandler = (id) => {
    axios
      .delete(`${RESERVATIONS}/${id}`, config())
      .then(() => {
        setReservations((prevReservations) =>
          prevReservations.filter((reservation) => reservation.id !== id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {loading ? (
        <div>
          <h1>loading...</h1>
        </div>
      ) : (
        <div>
          <h1>All Reservations</h1>
          <button className="create-btn" onClick={createHandler}>
            Create
          </button>
          <div>
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                roomType={roomTypes.find(
                  (type) => type.id === reservation.roomTypeId
                )}
                onClickEdit={() => editHandler(reservation.id)}
                onClickDelete={() => deleteHandler(reservation.id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Reservations;
