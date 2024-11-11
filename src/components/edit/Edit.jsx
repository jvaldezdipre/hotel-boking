import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

const Edit = () => {
  const { id } = useParams();
  //const [reservation, setReservation] = useState(null);
  console.log(id);

  return <div>Edit</div>;
};

export default Edit;
