/**
 * ReservationCard component.
 * Displays a reservation card with details and buttons for editing and deleting.
 * The edit button navigates to the EditReservation page
 * The delete button deletes the reservation.
 * @param {Object} props - reservation, roomType, onClickEdit, onClickDelete.
 */
const ReservationCard = (props) => {
  const { reservation, roomType, onClickEdit, onClickDelete } = props;
  return (
    <div className="card">
      <div className="details">
        <h3>Room Type: {roomType.name}</h3>
        <p>Guest Email: {reservation.guestEmail}</p>
        <p>Check-in Date: {reservation.checkInDate}</p>
        <p>Number of Nights: {reservation.numberOfNights}</p>
        <p>Total Cost: {reservation.numberOfNights * roomType.rate}</p>
      </div>
      <div className="button-container">
        <button onClick={onClickEdit} className="edit-btn">
          edit
        </button>
        <button onClick={onClickDelete} className="delete-btn">
          delete
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;
