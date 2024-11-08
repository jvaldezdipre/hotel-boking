const ReservationCard = ({ reservation }) => {
  return (
    <div className="reservation-card">
      <p>Guest Email: {reservation.guestEmail}</p>
      <p>Room Type:</p>
      <p>Check-in Date:</p>
      <p>Number of Nights:</p>
      <p>Total Cost:</p>
    </div>
  );
};

export default ReservationCard;
