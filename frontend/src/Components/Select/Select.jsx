import "./select.css";

const generateOptions = (min, max) => {
  const options = [];
  for (let i = min; i <= max; i++) {
    options.push(i);
  }

  return options.map((item, key) => (
    <option key={key} value={`${item}`}>
      {item}
    </option>
  ));
};

export const Select = ({ name, onChange, min, max }) => {
  return (
    <div className="select">
      <select name={name} onChange={(e) => onChange(e, name)}>
        {generateOptions(min, max)}
      </select>
    </div>
  );
};
