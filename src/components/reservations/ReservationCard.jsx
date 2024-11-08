const ReservationCard = ({ reservation }) => {
  return (
    <div className="reservation-card">
      <p>Guest Email: {reservation.guestEmail}</p>
      <p>
        Room Type:
        {/* Thinking if i should do a if else here */}
      </p>
      <p>Check-in Date: {reservation.checkInDate}</p>
      <p>Number of Nights: {reservation.numberOfNights}</p>
      <p>
        Total Cost:
        {/* Total cost will go here */}
      </p>
    </div>
  );
};

export default ReservationCard;
