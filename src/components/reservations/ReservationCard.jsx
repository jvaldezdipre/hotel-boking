const ReservationCard = ({ reservation, roomType, onClickEdit }) => {
  return (
    <div className="reservation-card">
      <p>Guest Email: {reservation.guestEmail}</p>
      <p>Room Type: {roomType.name}</p>
      <p>Check-in Date: {reservation.checkInDate}</p>
      <p>Number of Nights: {reservation.numberOfNights}</p>
      <p>Total Cost: {reservation.numberOfNights * roomType.rate}</p>
      <button onClick={onClickEdit}>edit</button>
      <button>delete</button>
    </div>
  );
};

export default ReservationCard;
