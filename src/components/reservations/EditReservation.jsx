import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Form from "../form/Form";
import Input from "../form/Input";
import Select from "../form/Select";
import Loading from "../loading/Loading";
import Modal from "../modal/Modal";
import axios from "../../api/axios";

import { config } from "../../api/config";
import { RESERVATIONS, ROOM_TYPES } from "../../api/endpoints";
import { isValidEmail, isValidDate } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import "./Reservation.css";

/**
 * EditReservation component.
 * Displays the form for editing a reservation.
 * @param {Object} props - user.
 */
const EditReservation = ({ user }) => {
  // Get the reservation id from the url
  const { id } = useParams();

  // Enable navigation to other pages
  const navigate = useNavigate();

  /**
   * State variables to manage room types, guest email,
   * check-in date, number of nights, room type and loading state and modal state.
   */
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestEmail, setGuestEmail] = useState({
    value: "",
    error: false,
    errorMsg: "Must be a valid email",
  });

  const [checkInDate, setCheckInDate] = useState({
    value: "",
    error: false,
    errorMsg: "Date must be mm-dd-yyyy",
  });

  const [numberOfNights, setNumberOfNights] = useState({
    value: "",
    error: false,
    errorMsg: "Number of nights must be greater than 0",
  });

  const [roomType, setRoomType] = useState({
    value: "",
    error: false,
    errorMsg: "Must select a room type",
  });

  /**
   * Fetches the reservation and room types data from the API.
   * Updates the state variables with the fetched data.
   */
  useEffect(() => {
    const getData = () => {
      Promise.all([
        axios.get(`${RESERVATIONS}/${id}`, config()),
        axios.get(ROOM_TYPES, config()),
      ])
        .then(([reservationResponse, roomTypesResponse]) => {
          const reservation = reservationResponse.data;
          setGuestEmail((prev) => ({ ...prev, value: reservation.guestEmail }));
          setCheckInDate((prev) => ({
            ...prev,
            value: reservation.checkInDate,
          }));
          setNumberOfNights((prev) => ({
            ...prev,
            value: reservation.numberOfNights,
          }));
          setRoomType((prev) => ({
            ...prev,
            value: reservation.roomTypeId,
          }));

          setRoomTypes(roomTypesResponse.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setIsModalOpen(true);
        });
    };
    getData();
  }, [id]);

  /**
   * Handles the input changes for the form fields.
   * @param {Event} event - The event object.
   */
  const inputHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "Guest Email":
        setGuestEmail((prev) => ({ ...prev, value: value, error: false }));
        break;
      case "Check-in Date":
        setCheckInDate((prev) => ({ ...prev, value: value, error: false }));
        break;
      case "Number of Nights":
        setNumberOfNights((prev) => ({ ...prev, value: value, error: false }));
        break;
      case "Room Type":
        setRoomType((prev) => ({ ...prev, value: value, error: false }));
        break;
      default:
        break;
    }
  };

  /**
   * Handles the form submission.
   * Validates the form fields and updates the reservation.
   * @param {Event} event - The event object.
   */
  const submitHandler = async (event) => {
    event.preventDefault();

    let formError = false;

    // Validate guest email
    if (!isValidEmail(guestEmail.value)) {
      formError = true;
      setGuestEmail((prev) => ({ ...prev, error: true }));
    }

    // Validate check-in date
    if (!isValidDate(checkInDate.value)) {
      formError = true;
      setCheckInDate((prev) => ({ ...prev, error: true }));
    }

    // Validate number of nights
    if (numberOfNights.value <= 0) {
      formError = true;
      setNumberOfNights((prev) => ({ ...prev, error: true }));
    }

    // Validate room type
    if (roomType.value === "0") {
      formError = true;
      setRoomType((prev) => ({ ...prev, error: true }));
    }

    // If no form errors are found, update the reservation
    if (!formError) {
      axios
        .put(
          `${RESERVATIONS}/${id}`,
          {
            id: id,
            user: user,
            guestEmail: guestEmail.value,
            roomTypeId: Number(roomType.value),
            checkInDate: checkInDate.value,
            numberOfNights: Number(numberOfNights.value),
          },
          config()
        )
        .then((response) => {
          console.log("Updated reservation", response.data);
          navigate("/reservations");
          setGuestEmail((prev) => ({ ...prev, error: false }));
          setCheckInDate((prev) => ({ ...prev, error: false }));
          setNumberOfNights((prev) => ({ ...prev, error: false }));
          setRoomType((prev) => ({ ...prev, error: false }));
        })
        .catch(() => {
          setIsModalOpen(true);
        });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="reservation-container">
          <Modal isOpen={isModalOpen} onClose={closeModal} />
          <div className="reservation-form-container">
            <Form
              title="Edit Reservation"
              text="Update"
              onSubmit={submitHandler}
              noValidate
            >
              <Input
                name="Guest Email"
                type="email"
                value={guestEmail.value}
                onChange={inputHandler}
                error={guestEmail.error}
                errorMsg={guestEmail.errorMsg}
              />
              <Input
                name="Check-in Date"
                type="text"
                value={checkInDate.value}
                onChange={inputHandler}
                error={checkInDate.error}
                errorMsg={checkInDate.errorMsg}
              />
              <Input
                name="Number of Nights"
                type="number"
                value={numberOfNights.value}
                onChange={inputHandler}
                error={numberOfNights.error}
                errorMsg={numberOfNights.errorMsg}
              />
              <Select
                name="Room Type"
                value={roomType.value}
                onChange={inputHandler}
                error={roomType.error}
                errorMsg={roomType.errorMsg}
                roomTypes={roomTypes}
              />
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditReservation;
