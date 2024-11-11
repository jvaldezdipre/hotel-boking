const Select = (props) => {
  const { name, value, onChange, options } = props;

  return (
    <div className="select-container">
      <label className="select-label" htmlFor={name}>
        {name}
      </label>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
