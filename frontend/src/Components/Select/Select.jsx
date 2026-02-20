import "./select.css";
export const Select = ({ name, onChange, options }) => {
  return (
    <div className="select">
      <select name={name} onChange={(e) => onChange(e, name)}>
        {options?.map((item) => (
          <option value={`${item}`}>{item}</option>
        ))}
      </select>
    </div>
  );
};
