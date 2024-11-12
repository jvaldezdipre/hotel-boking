const Select = (props) => {
  const { name, value, onChange, options, error, errorMsg } = props;

  return (
    <div className="select-container">
      <label className="select-label" htmlFor={name}>
        {name}
      </label>
      <select name={name} value={value} onChange={onChange}>
        <option value="Select Room Type">Select Room Type</option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

export default Select;
