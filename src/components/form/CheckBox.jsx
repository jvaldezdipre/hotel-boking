/**
 * Checkbox component.
 * @param {Object} props - name, checked, onChange.
 */
const CheckBox = (props) => {
  const { name, checked, onChange } = props;
  return (
    <div className="checkbox-container">
      <label htmlFor={name}>{name}</label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default CheckBox;
