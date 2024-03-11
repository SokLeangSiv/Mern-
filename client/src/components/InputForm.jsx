// eslint-disable-next-line react/prop-types
const InputForm = ({ name,labelText,defaultValue,type, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
       {labelText}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        onChange={onChange}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};

export default InputForm;
