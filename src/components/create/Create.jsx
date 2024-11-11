import { useState } from "react";

import Form from "../form/Form";
import Input from "../input/Input";
import Select from "../select/Select";
import axios from "../../api/axios";
import { config } from "../../api/config";

import { isValidEmail } from "../../utils/validation";
import { roomTypes } from "../../utils/roomTypes";
import { RESERVATIONS } from "../../api/endpoints";

const Create = () => {
  const [guestEmail, setGuestEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [roomType, setRoomType] = useState(1);

  const [errors, setErrors] = useState({
    guestEmail: "",
    checkInDate: "",
    numberOfNights: "",
    roomType: "",
  });

  const inputHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "Guest Email":
        setGuestEmail(value);
        break;
      case "Check-in Date":
        setCheckInDate(value);
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

    if (!isValidEmail(guestEmail)) {
      formError = true;
      setErrors({ ...errors, guestEmail: "Must be a valid email" });
      console.log("Must be a valid email");
    }

    if (!formError) {
      axios
        .post(
          RESERVATIONS,
          { guestEmail, checkInDate, numberOfNights, roomType },
          config()
        )
        .then((response) => {
          if (response.status === 200) {
            console.log("reservation created!");
          }
        })
        .catch((err) => {
          console.log(err);
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
          value={guestEmail}
          onChange={inputHandler}
          error={errors.guestEmail}
        />
        <Input
          name="Check-in Date"
          type="text"
          value={checkInDate}
          onChange={inputHandler}
          error={errors.checkInDate}
        />
        <Input
          name="Number of Nights"
          type="number"
          value={numberOfNights}
          onChange={inputHandler}
          error={errors.numberOfNights}
        />
        <Select
          name="Room Type"
          value={roomType}
          onChange={inputHandler}
          options={roomTypes}
          error={errors.roomType}
        />
      </Form>
    </div>
  );
};

export default Create;
