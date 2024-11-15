import "./Form.css";

/**
 * Input component.
 * @param {Object} props - error, errorMsg, name, type, value, onChange.
 */
const Input = (props) => {
  const { error, errorMsg, name, type, value, onChange } = props;

  return (
    <div className="input-container">
      <div className="input-label-container">
        <label className="input-label" htmlFor={name}>
          {name}
        </label>
        {error && <span className="err-message"> {errorMsg}</span>}
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
    </div>
  );
};

export default Input;
