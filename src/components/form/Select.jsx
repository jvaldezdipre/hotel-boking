const Select = (props) => {
  const { name, value, onChange, roomTypes, error, errorMsg } = props;

  return (
    <div className="select-container">
      <label className="select-label" htmlFor={name}>
        {name}
      </label>
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
      {error && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

export default Select;
