import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

const Delete = () => {
  const { id } = useParams();

  useEffect(() => {
    axios.delete(`/reservations/${id}`).then((res) => {
      console.log(res);
    });
  }, [id]);

  return <div>Delete</div>;
};

export default Delete;
