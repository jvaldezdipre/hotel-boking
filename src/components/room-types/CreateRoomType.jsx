import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../form/Form";
import Input from "../form/Input";
import TextArea from "../form/TextArea";
import CheckBox from "../form/CheckBox";
import axios from "../../api/axios";

import { config } from "../../api/config";
import { ROOM_TYPES } from "../../api/endpoints";
import { isValidRoomType } from "../../utils/validation";

const CreateRoomType = () => {
  const navigate = useNavigate();

  const [roomTypeInput, setRoomTypeInput] = useState({
    value: "",
    error: false,
    errorMsg: "Must be at least 3 characters",
  });

  const [descriptionInput, setDescriptionInput] = useState("");

  const [rateInput, setRateInput] = useState({
    value: "",
    error: false,
    errorMsg: "Must be greater than 0",
  });

  const [activeInput, setActiveInput] = useState(false);

  const inputHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "Room Type":
        setRoomTypeInput({ ...roomTypeInput, value: value });
        break;
      case "Description":
        setDescriptionInput(value);
        break;
      case "Rate":
        setRateInput({ ...rateInput, value: value });
        break;
      case "Active":
        setActiveInput(event.target.checked ? true : false);
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

    if (rateInput.value <= 0) {
      formError = true;
      setRateInput({ ...rateInput, error: true });
    }

    if (!formError) {
      console.log("Form is valid");
      axios
        .post(
          ROOM_TYPES,
          {
            name: roomTypeInput.value,
            description: descriptionInput,
            rate: Number(rateInput.value),
            active: activeInput,
          },
          config()
        )
        .then((response) => {
          console.log("Created new room type", response.data);
          navigate("/room-types");
          setRoomTypeInput({ ...roomTypeInput, error: false });
          setRateInput({ ...rateInput, error: false });
          setActiveInput(false);
          setDescriptionInput("");
        })
        .catch((error) => {
          console.log("Error creating room type", error);
        });
    }
  };

  return (
    <div className="create-container">
      <h1>Create Room Type</h1>
      <Form
        title="Create Room Type"
        text="Create"
        onSubmit={submitHandler}
        noValidate
      >
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
        <Input
          name="Rate"
          type="number"
          value={rateInput.value}
          error={rateInput.error}
          errorMsg={rateInput.errorMsg}
          onChange={inputHandler}
        />
        <CheckBox name="Active" checked={activeInput} onChange={inputHandler} />
      </Form>
    </div>
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
