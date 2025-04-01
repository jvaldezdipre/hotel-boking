import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Form from "../form/Form";
import Input from "../form/Input";
import TextArea from "../form/TextArea";
import CheckBox from "../form/CheckBox";
import Loading from "../loading/Loading";
import Modal from "../modal/Modal";
import axios from "../../api/axios";

import { config } from "../../api/config";
import { ROOM_TYPES } from "../../api/endpoints";
import { isValidRoomType } from "../../utils/validation";

import "./RoomTypes.css";

/**
 * EditRoomType component
 * Allows the user to edit a room type.
 */
const EditRoomType = () => {
  // Get the room type id from the url
  const { id } = useParams();

  // Enables navigation to other pages
  const navigate = useNavigate();

  /**
   * State variables to manage the room type input, description input,
   * rate input, active input, and loading state.
   */
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [activeInput, setActiveInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
   * Fetches the room type data with the given id from the api
   * and sets the room type input state variables.
   */
  useEffect(() => {
    const getData = () => {
      setLoading(true);
      axios
        .get(`${ROOM_TYPES}/${id}`, config())
        .then((response) => {
          const roomType = response.data;
          console.log("Room type", roomType);
          setRoomTypeInput((prev) => ({
            ...prev,
            value: roomType.name,
          }));
          setDescriptionInput(roomType.description);
          setRateInput((prev) => ({
            ...prev,
            value: roomType.rate,
          }));
          setActiveInput(roomType.active);
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
   * Handles the edit form submission.
   * @param {Event} event - The event object.
   */
  const submitHandler = (event) => {
    // Prevents the default form submission
    event.preventDefault();

    let formError = false;

    // Validate room type input
    if (!isValidRoomType(roomTypeInput.value)) {
      formError = true;
      setRoomTypeInput((prev) => ({ ...prev, error: true }));
    }

    // Validate rate input
    if (rateInput.value <= 0) {
      formError = true;
      setRateInput((prev) => ({ ...prev, error: true }));
    }

    // If no form errors are found, update the room type
    if (!formError) {
      setIsSubmitting(true);
      axios
        .put(
          `${ROOM_TYPES}/${id}`,
          {
            id: id,
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
          setIsSubmitting(false);
        });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <div className="room-types-container">
      <div className="room-types-form-container">
        <Modal isOpen={isModalOpen} onClose={closeModal} />
        <Form
          title="Edit Room Type"
          text="Update"
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

export default EditRoomType;
