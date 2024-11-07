import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { RESERVATIONS } from "../../api/endpoints";
import { config } from "../../api/config";

const Reservations = () => {
  //state to hold the array of rervations it will be an array of objects
  const [reservations, setReservation] = useState([]);

  useEffect(() => {
    //state is being added but for somereason when it takes me
    // to the reservation page i have to reload the page to get the reservations
    const fetchReservations = async () => {
      try {
        const response = await axios.get(RESERVATIONS, config);
        console.log(response.data);
        //state is saving the reservation
        setReservation(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReservations();
  }, []);

  return (
    <div>
      <h1>Reservations</h1>
    </div>
  );
};

export default Reservations;
