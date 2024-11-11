import { useState } from "react";

import Form from "../form/Form";
import Input from "../input/Input";
import Select from "../select/Select";
import axios from "../../api/axios";
import { config } from "../../api/config";
import { isValidEmail, isValidDate } from "../../utils/validation";
import { roomTypes } from "../../utils/roomTypes";
import { RESERVATIONS } from "../../api/endpoints";

const Create = () => {
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
  const [roomType, setRoomType] = useState(1);

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
        setNumberOfNights(value);
        break;
      case "Room Type":
        setRoomType(value);
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

    if (!formError) {
      setGuestEmail({ ...guestEmail, error: false });
      setCheckInDate({ ...checkInDate, error: false });
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
        />
        <Select
          name="Room Type"
          value={roomType}
          onChange={inputHandler}
          options={roomTypes}
        />
      </Form>
    </div>
  );
};

export default Create;
