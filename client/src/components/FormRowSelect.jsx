
function FormRowSelect({ name, list, labelText, defaultValue }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>

      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
      >
        {list.map(itemValue => {
          return (
            <option value={itemValue} key={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormRowSelect;
