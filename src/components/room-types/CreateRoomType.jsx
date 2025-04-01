import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../form/Form";
import Input from "../form/Input";
import TextArea from "../form/TextArea";
import CheckBox from "../form/CheckBox";
import axios from "../../api/axios";
import Modal from "../modal/Modal";
import Loading from "../loading/Loading";

import { config } from "../../api/config";
import { ROOM_TYPES } from "../../api/endpoints";
import { isValidRoomType } from "../../utils/validation";

import "./RoomTypes.css";

/**
 * CreateRoomType component.
 * Displays the form for creating a new room type.
 */
const CreateRoomType = () => {
  const navigate = useNavigate();

  /**
   * State variables to manage room type input, description input, rate input,
   * and active input and modal state.
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [activeInput, setActiveInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [roomTypeInput, setRoomTypeInput] = useState({
    value: "",
    error: false,
    errorMsg: "Must be at least 3 characters",
  });

  const [rateInput, setRateInput] = useState({
    value: "",
    error: false,
    errorMsg: "Must be greater than 0",
  });

  /**
   * Handles the input changes for the form fields.
   * @param {Event} event - The event object.
   */
  const inputHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "Room Type":
        setRoomTypeInput((prev) => ({ ...prev, value: value }));
        break;
      case "Description":
        setDescriptionInput(value);
        break;
      case "Rate":
        setRateInput((prev) => ({ ...prev, value: value }));
        break;
      case "Active":
        setActiveInput(event.target.checked ? true : false);
        break;
      default:
        break;
    }
  };

  /**
   * Handles the form submission.
   * @param {Event} event - The event object.
   */
  const submitHandler = (event) => {
    event.preventDefault();

    let formError = false;

    // Validate room type
    if (!isValidRoomType(roomTypeInput.value)) {
      formError = true;
      setRoomTypeInput((prev) => ({ ...prev, error: true }));
    }

    // Validate rate
    if (rateInput.value <= 0) {
      formError = true;
      setRateInput((prev) => ({ ...prev, error: true }));
    }

    // If no form errors are found, create the room type
    if (!formError) {
      setIsLoading(true);
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
        .then(() => {
          navigate("/room-types");
          setRoomTypeInput((prev) => ({ ...prev, error: false }));
          setRateInput((prev) => ({ ...prev, error: false }));
          setActiveInput(false);
          setDescriptionInput("");
        })
        .catch(() => {
          setIsModalOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="room-types-container">
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <div className="room-types-form-container">
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
          <CheckBox
            name="Active"
            checked={activeInput}
            onChange={inputHandler}
          />
        </Form>
      </div>
    </div>
  );
};

export default CreateRoomType;
