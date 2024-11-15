const RoomTypeCard = (props) => {
  const { roomType, onClickEdit } = props;
  return (
    <div className="card">
      <div className="details">
        <h3>Room Type: {roomType.name}</h3>
        <p>Description: {roomType.description}</p>
        <p>Rate: {roomType.rate}</p>
        <p>Active: {roomType.active ? "Active" : "Inactive"}</p>
      </div>
      <div className="button-container">
        <button onClick={onClickEdit} className="edit-btn">
          Edit
        </button>
      </div>
    </div>
  );
};

export default RoomTypeCard;
