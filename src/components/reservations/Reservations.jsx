import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { RESERVATIONS } from "../../api/endpoints";
import { config } from "../../api/config";
import ReservationCard from "./ReservationCard";

const Reservations = () => {
  //state to hold the array of rervations it will be an array of objects
  const [reservations, setReservation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = () => {
      axios
        .get(RESERVATIONS, config())
        .then((response) => {
          console.log(response.data);
          setReservation(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchReservations();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <h1>loading...</h1>
        </div>
      ) : (
        <div>
          <h1>Reservations</h1>
          <div>
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Reservations;
