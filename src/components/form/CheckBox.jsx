const CheckBox = (props) => {
  const { name, value, onChange } = props;
  return (
    <div className="checkbox-container">
      <label htmlFor={name}>{name}</label>
      <input type="checkbox" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default CheckBox;
