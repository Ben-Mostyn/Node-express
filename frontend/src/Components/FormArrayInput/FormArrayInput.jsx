import { useState } from "react";
import "./FormArrayInput.css";
import classNames from "classnames";
import CrossIcon from "../../Icons/CrossIcon.svg?react";
export const FormArrayInput = ({
  name,
  ref,
  onClick,
  data,
  setNewDailyLog,
}) => {
  const [disabled, setDisabled] = useState(true);

  const handleClick = (e, value) => {
    e.preventDefault();
    setNewDailyLog((prev) => ({
      ...prev,
      [name]: [...prev[name].filter((item) => item !== value)],
    }));
  };
  return (
    <div>
      <div className="inputSection">
        <input
          name={name}
          type="text"
          ref={ref}
          onChange={(e) =>
            e.target.value ? setDisabled(false) : setDisabled(true)
          }
        />
        <button
          className="formArrayInputBtn"
          type="button"
          onClick={(e) => onClick(e, name, ref)}
          disabled={disabled}
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
          <li>
            {item}
            <button
              className="closeBtn"
              onClick={(e) => handleClick(e, item)}
              aria-label="remove item"
              title="remove item"
            >
              <CrossIcon className="crossIcon" />
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};
