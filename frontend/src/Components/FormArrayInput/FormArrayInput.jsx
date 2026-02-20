import "./FormArrayInput.css";
import classNames from "classnames";
export const FormArrayInput = ({ name, ref, onClick, data }) => {
  return (
    <div>
      <div className="inputSection">
        <input name={name} type="text" ref={ref} />
        <button
          className="formArrayInputBtn"
          type="button"
          onClick={(e) => onClick(e, name, ref)}
        >
          Add task
        </button>
      </div>
      {data.length > 0 && (
        <p>
          You have added {data.length} {data.length === 1 ? "item" : "items"}
        </p>
      )}
      <div
        className={classNames({
          addedItems: data.length > 0,
        })}
      >
        {data.map((item) => (
          <li>{item}</li>
        ))}
      </div>
    </div>
  );
};
