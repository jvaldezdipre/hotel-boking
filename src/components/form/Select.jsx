const Select = (props) => {
  const { name, value, onChange, roomTypes, error, errorMsg } = props;

  return (
    <div className="select-container">
      <div className="input-label-container">
        <label htmlFor={name}>{name}</label>
        {error && <span className="err-message"> {errorMsg}</span>}
      </div>
      <select name={name} value={value} onChange={onChange}>
        <option value={0}>Select Room Type</option>
        {roomTypes.map(
          (roomType) =>
            roomType.active && (
              <option key={roomType.id} value={roomType.id}>
                {roomType.name}
              </option>
            )
        )}
      </select>
    </div>
  );
};

export default Select;
