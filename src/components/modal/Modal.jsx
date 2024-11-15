import "./Modal.css";

/**
 * Modal component.
 * Displays a modal when isOpen is true showing the error message.
 * @param {Object} props - isOpen and onClose.
 */
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <h2>Oops! Something went wrong.</h2>
        </div>
      </div>
    </div>
  );
};

export default Modal;
