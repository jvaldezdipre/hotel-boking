/**
 * TextArea component.
 * @param {Object} props - name, value, onChange.
 */
const TextArea = (props) => {
  const { name, value, onChange } = props;
  return (
    <div className="textarea-container">
      <label className="textarea-label" htmlFor={name}>
        {name}
      </label>
      <textarea name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default TextArea;
