import "./Form.css";

const Input = (props) => {
  const { error, errorMsg, name, type, value, onChange } = props;

  return (
    <div className="input-container">
      <label className="input-label" htmlFor={name}>
        {name}
      </label>
      <input
        className={error ? "input error" : "input"}
        name={name}
        placeholder={name}
        type={type}
        value={value}
        id={name}
        onChange={onChange}
      />
      {error && <p className="err-message">{errorMsg}</p>}
    </div>
  );
};

export default Input;
