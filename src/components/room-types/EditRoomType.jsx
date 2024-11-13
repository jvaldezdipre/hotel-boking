import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Form from "../form/Form";
import Input from "../form/Input";
import TextArea from "../form/TextArea";
import CheckBox from "../form/CheckBox";
import axios from "../../api/axios";

import { config } from "../../api/config";
import { ROOM_TYPES } from "../../api/endpoints";
import { isValidRoomType } from "../../utils/validation";

const EditRoomType = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const getData = () => {
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
        .catch((error) => {
          setLoading(false);
          console.log("Error fetching room type", error);
        });
    };
    getData();
  }, [id]);

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
      navigate("/room-types");
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
        .then((response) => {
          console.log("Updated room type", response.data);
          navigate("/room-types");
          setRoomTypeInput({ ...roomTypeInput, error: false });
          setRateInput({ ...rateInput, error: false });
          setActiveInput(false);
          setDescriptionInput("");
        })
        .catch((error) => {
          console.log("Error updating room type", error);
        });
    }
  };

  return (
    <div className="create-container">
      {loading ? (
        <div>
          <h1>loading...</h1>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default EditRoomType;
