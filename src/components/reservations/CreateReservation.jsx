import { useState, useEffect } from "react";

import Form from "../form/Form";
import Input from "../form/Input";
import Select from "../form/Select";
import Modal from "../modal/Modal";
import Loading from "../loading/Loading";
import axios from "../../api/axios";

import { config } from "../../api/config";
import { RESERVATIONS, ROOM_TYPES } from "../../api/endpoints";
import { isValidEmail, isValidDate } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import "./Reservation.css";

/**
 * CreateReservation component.
 * Displays the form for creating a new reservation.
 * @param {Object} props - user.
 */
const CreateReservation = ({ user }) => {
  const navigate = useNavigate();

  /**
   * State variables to manage room types, guest email,
   * check-in date, number of nights, and room type and modal state.
   */
  const [roomTypes, setRoomTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestEmailInput, setGuestEmailInput] = useState({
    value: "",
    error: false,
    errorMsg: "Must be a valid email",
  });

  const [checkInDateInput, setCheckInDateInput] = useState({
    value: "",
    error: false,
    errorMsg: "Date must be mm-dd-yyyy",
  });

  const [numberOfNightsInput, setNumberOfNightsInput] = useState({
    value: 0,
    error: false,
    errorMsg: "Number of nights must be greater than 0",
  });

  const [roomTypeInput, setRoomTypeInput] = useState({
    value: 0,
    error: false,
    errorMsg: "Must select a room type",
  });

  /**
   * Retrieves the room types from the API and sets it to the room types state.
   */
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(ROOM_TYPES, config())
      .then((response) => {
        setRoomTypes(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsModalOpen(true);
        setIsLoading(false);
      });
  }, []);

  /**
   * Handles the input changes for the form fields.
   * @param {Event} event - The event object.
   */
  const inputHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "Guest Email":
        setGuestEmailInput((prev) => ({ ...prev, value: value, error: false }));
        break;
      case "Check-in Date":
        setCheckInDateInput((prev) => ({
          ...prev,
          value: value,
          error: false,
        }));
        break;
      case "Number of Nights":
        setNumberOfNightsInput((prev) => ({
          ...prev,
          value: value,
          error: false,
        }));
        break;
      case "Room Type":
        setRoomTypeInput((prev) => ({ ...prev, value: value, error: false }));
        break;
      default:
        break;
    }
  };

  /**
   * Handles the form submission.
   * Validates the form fields and creates a new reservation.
   * @param {Event} event - The event object.
   */
  const submitHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    let formError = false;

    // Validate guest email
    if (!isValidEmail(guestEmailInput.value)) {
      formError = true;
      setGuestEmailInput((prev) => ({ ...prev, error: true }));
    }

    // Validate check-in date
    if (!isValidDate(checkInDateInput.value)) {
      formError = true;
      setCheckInDateInput((prev) => ({ ...prev, error: true }));
    }

    // Validate number of nights
    if (numberOfNightsInput.value <= 0) {
      formError = true;
      setNumberOfNightsInput((prev) => ({ ...prev, error: true }));
    }

    // Validate room type
    if (roomTypeInput.value === 0) {
      formError = true;
      setRoomTypeInput((prev) => ({ ...prev, error: true }));
    }

    // If no form errors are found, create the reservation
    if (!formError) {
      setIsSubmitting(true);
      axios
        .post(
          RESERVATIONS,
          {
            user: user,
            guestEmail: guestEmailInput.value,
            roomTypeId: Number(roomTypeInput.value),
            checkInDate: checkInDateInput.value,
            numberOfNights: Number(numberOfNightsInput.value),
          },
          config()
        )
        .then(() => {
          navigate("/reservations");
          setGuestEmailInput((prev) => ({ ...prev, error: false }));
          setCheckInDateInput((prev) => ({ ...prev, error: false }));
          setNumberOfNightsInput((prev) => ({ ...prev, error: false }));
          setRoomTypeInput((prev) => ({ ...prev, error: false }));
        })
        .catch(() => {
          setIsModalOpen(true);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <div className="reservation-container">
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <div className="reservation-form-container">
        <Form
          title="Create a Reservation"
          text="Create"
          onSubmit={submitHandler}
          noValidate
        >
          <Input
            name="Guest Email"
            type="email"
            value={guestEmailInput.value}
            onChange={inputHandler}
            error={guestEmailInput.error}
            errorMsg={guestEmailInput.errorMsg}
          />
          <Input
            name="Check-in Date"
            type="text"
            value={checkInDateInput.value}
            onChange={inputHandler}
            error={checkInDateInput.error}
            errorMsg={checkInDateInput.errorMsg}
          />
          <Input
            name="Number of Nights"
            type="number"
            value={numberOfNightsInput.value}
            onChange={inputHandler}
            error={numberOfNightsInput.error}
            errorMsg={numberOfNightsInput.errorMsg}
          />
          <Select
            name="Room Type"
            value={roomTypeInput.value}
            onChange={inputHandler}
            error={roomTypeInput.error}
            errorMsg={roomTypeInput.errorMsg}
            roomTypes={roomTypes}
          />
        </Form>
      </div>
    </div>
  );
};

export default CreateReservation;
