import { useState } from "react";
import Form from "../form/Form";
import Input from "../input/Input";
import { roomTypes } from "../../utils/roomTypes";
import Select from "../select/Select";

const Create = () => {
  const [guestEmail, setGuestEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [roomType, setRoomType] = useState(1);

  const inputHandler = (event) => {};

  const submitHandler = (event) => {};

  return (
    <div className="create-container">
      <h1>Create</h1>
      <Form title="Create a Reservation" text="Create" onSubmit={submitHandler}>
        <Input
          name="Guest Email"
          type="email"
          value={guestEmail}
          onChange={inputHandler}
        />
        <Input
          name="Check-in Date"
          type="text"
          value={checkInDate}
          onChange={inputHandler}
        />
        <Input
          name="Number of Nights"
          type="number"
          value={numberOfNights}
          onChange={inputHandler}
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
