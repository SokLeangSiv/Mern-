// eslint-disable-next-line react/prop-types
const InputForm = ({ name,labelText,defaultValue,type }) => {
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
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};

export default InputForm;
