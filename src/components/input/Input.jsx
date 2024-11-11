const Input = (props) => {
  const { error, name, type, value, onChange } = props;

  return (
    <div className="input-container">
      <label className="input-label" htmlFor={name}>
        {name}
      </label>
      <input
        className="input"
        name={name}
        type={type}
        value={value}
        id={name}
        onChange={onChange}
      />
      {error && <p className="err-message">{error}</p>}
    </div>
  );
};

export default Input;
