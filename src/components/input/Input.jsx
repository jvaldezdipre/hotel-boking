const Input = (props) => {
  const { error, errMsg, name, type, value, onChange } = props;

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
      {error && <p className="err-message">{errMsg}</p>}
    </div>
  );
};

export default Input;
