import { useState, useEffect } from "react";

import Form from "../form/Form";
import Input from "../input/Input";
import Select from "../select/Select";
import axios from "../../api/axios";

import { config } from "../../api/config";
import { RESERVATIONS, ROOM_TYPES } from "../../api/endpoints";
import { isValidEmail, isValidDate } from "../../utils/validation";
//import { roomTypes } from "../../utils/roomTypes";

const Create = () => {
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

  //working on this after
  const [numberOfNights, setNumberOfNights] = useState({
    value: 0,
    error: false,
    errorMsg: "Number of nights must be greater than 0",
  });

  const [roomType, setRoomType] = useState({
    value: "Select Room Type",
    error: false,
    errorMsg: "Must select a room type",
  });

  useEffect(() => {
    axios.get(ROOM_TYPES, config()).then((response) => {
      setRoomTypes(response.data);
      console.log(response.data);
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
        setRoomType({ ...roomType, value: value, error: false });
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
      console.log("Must be a valid email");
    }

    if (!isValidDate(checkInDate.value)) {
      formError = true;
      setCheckInDate({ ...checkInDate, error: true });
      console.log("Date must be mm-dd-yyyy");
    }

    if (numberOfNights.value <= 0) {
      formError = true;
      setNumberOfNights({ ...numberOfNights, error: true });
      console.log("Number of nights must be greater than 0");
    }

    if (roomType.value === "Select Room Type") {
      formError = true;
      setRoomType({ ...roomType, error: true });
      console.log("Must select a room type");
    }

    if (!formError) {
      setGuestEmail({ ...guestEmail, error: false });
      setCheckInDate({ ...checkInDate, error: false });
      setNumberOfNights({ ...numberOfNights, error: false });
      setRoomType({ ...roomType, error: false });
      // axios
      //   .post(
      //     RESERVATIONS,
      //     { guestEmail, checkInDate, numberOfNights, roomType },
      //     config()
      //   )
      //   .then((response) => {
      //     if (response.status === 200) {
      //       console.log("reservation created!");
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
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
          value={roomType.value}
          onChange={inputHandler}
          error={roomType.error}
          errorMsg={roomType.errorMsg}
          roomTypes={roomTypes}
        />
      </Form>
    </div>
  );
};

export default Create;
