import { useState } from "react";

import Form from "../form/Form";
import Input from "../form/Input";
import TextArea from "../form/TextArea";

import { isValidRoomType } from "../../utils/validation";

const CreateRoomType = () => {
  const [roomTypeInput, setRoomTypeInput] = useState({
    value: "",
    error: false,
    errorMsg: "Must be at least 3 characters",
  });

  const [descriptionInput, setDescriptionInput] = useState("");

  const inputHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "Room Type":
        setRoomTypeInput({ ...roomTypeInput, value: value });
        break;
      case "Description":
        setDescriptionInput(value);
        break;
      default:
        break;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let formError = false;

    if (!isValidRoomType(roomTypeInput.value)) {
      formError = true;
      setRoomTypeInput({ ...roomTypeInput, error: true });
    }

    if (!formError) {
      console.log("Form is valid");
      setRoomTypeInput({ ...roomTypeInput, error: false });
    }
  };

  return (
    <Form title="Create Room Type" text="Create" onSubmit={submitHandler}>
      <Input
        name="Room Type"
        type="text"
        value={roomTypeInput.value}
        error={roomTypeInput.error}
        errorMsg={roomTypeInput.errorMsg}
        onChange={inputHandler}
      />
      <TextArea
        name="Description"
        onChange={inputHandler}
        value={descriptionInput}
      />
      <Input name="Rate" type="number" />
      <Input name="Active" type="checkbox" />
    </Form>
  );
};

export default CreateRoomType;

// {
//     "id": 1,
//     "name": "King",
//     "description": "Single king non-smoking",
//     "rate": 129.99,
//     "active": true
// }
