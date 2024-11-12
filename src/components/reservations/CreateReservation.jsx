import { useState, useEffect } from "react";

import Form from "../form/Form";
import Input from "../form/Input";
import Select from "../form/Select";
import axios from "../../api/axios";

import { config } from "../../api/config";
import { RESERVATIONS, ROOM_TYPES } from "../../api/endpoints";
import { isValidEmail, isValidDate } from "../../utils/validation";
import { useNavigate } from "react-router-dom";

const Create = ({ user }) => {
  const navigate = useNavigate();

  const [roomTypes, setRoomTypes] = useState([]);
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
    value: 0,
    error: false,
    errorMsg: "Number of nights must be greater than 0",
  });

  const [roomTypeId, setRoomTypeId] = useState({
    value: 0,
    error: false,
    errorMsg: "Must select a room type",
  });

  useEffect(() => {
    axios.get(ROOM_TYPES, config()).then((response) => {
      setRoomTypes(response.data);
    });
  }, []);

  const inputHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "Guest Email":
        setGuestEmail({ ...guestEmail, value: value, error: false });
        break;
      case "Check-in Date":
        setCheckInDate({ ...checkInDate, value: value, error: false });
        break;
      case "Number of Nights":
        setNumberOfNights({ ...numberOfNights, value: value, error: false });
        break;
      case "Room Type":
        setRoomTypeId({ ...roomTypeId, value: value, error: false });
        break;
      default:
        break;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    let formError = false;

    if (!isValidEmail(guestEmail.value)) {
      formError = true;
      setGuestEmail({ ...guestEmail, error: true });
    }

    if (!isValidDate(checkInDate.value)) {
      formError = true;
      setCheckInDate({ ...checkInDate, error: true });
    }

    if (numberOfNights.value <= 0) {
      formError = true;
      setNumberOfNights({ ...numberOfNights, error: true });
    }

    if (roomTypeId.value === 0) {
      formError = true;
      setRoomTypeId({ ...roomTypeId, error: true });
    }

    if (!formError) {
      axios
        .post(
          RESERVATIONS,
          {
            user: user,
            guestEmail: guestEmail.value,
            roomTypeId: Number(roomTypeId.value),
            checkInDate: checkInDate.value,
            numberOfNights: Number(numberOfNights.value),
          },
          config()
        )
        .then((response) => {
          console.log("Created new reservation", response.data);
          navigate("/reservations");
          setGuestEmail({ ...guestEmail, error: false });
          setCheckInDate({ ...checkInDate, error: false });
          setNumberOfNights({ ...numberOfNights, error: false });
          setRoomTypeId({ ...roomTypeId, error: false });
        });
    }
  };

  return (
    <div className="create-container">
      <h1>Create</h1>
      <Form
        title="Create a Reservation"
        text="Create"
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
          value={roomTypeId.value}
          onChange={inputHandler}
          error={roomTypeId.error}
          errorMsg={roomTypeId.errorMsg}
          roomTypes={roomTypes}
        />
      </Form>
    </div>
  );
};

export default Create;
