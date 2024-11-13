const RoomTypeCard = ({ roomType, onClickEdit }) => {
  return (
    <div className="room-type-card">
      <p>Room Type: {roomType.name}</p>
      <p>Description: {roomType.description}</p>
      <p>Rate: {roomType.rate}</p>
      <p>Active: {roomType.active ? "Active" : "Inactive"}</p>
      <button onClick={onClickEdit}>Edit</button>
    </div>
  );
};

export default RoomTypeCard;
