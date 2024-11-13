const RoomTypeCard = ({ roomType }) => {
  return (
    <div className="room-type-card">
      <p>Room Type: {roomType.name}</p>
      <p>Description: {roomType.description}</p>
      <p>Rate: {roomType.rate}</p>
      <p>Active: {roomType.active ? "Active" : "Inactive"}</p>
    </div>
  );
};

export default RoomTypeCard;
