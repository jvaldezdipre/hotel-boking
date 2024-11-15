import "./Form.css";

const Input = (props) => {
  const { error, errorMsg, name, type, value, onChange } = props;

  return (
    <div className="input-container">
      <div className="input-label-container">
        <label className="input-label" htmlFor={name}>
          {name}
        </label>
      </div>
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
