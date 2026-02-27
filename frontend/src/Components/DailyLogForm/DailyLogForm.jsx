import MoreHelpIcon from "../../Icons/MoreHelpIcon.svg?react";
import { FormArrayInput } from "../FormArrayInput/FormArrayInput";
import { Select } from "../Select/Select";
import "../../Pages/DailyLog/dailyLog.css";

const options = [0, 1, 2, 3, 4, 5];

export const DailyLogForm = ({
  plannedTaskRef,
  handleArrayClick,
  newDailyLog,
  setNewDailyLog,
  handleChange,
  actualTaskRef,
  distractionRef,
  mutateAsync,
  variant = "default",
  editDailyLog,
  data,
  setOpenEditing,
}) => {
  console.log({
    handleArrayClick,
    newDailyLog,
    setNewDailyLog,
    handleChange,
    mutateAsync,
    editDailyLog,
    data,
    setOpenEditing,
  });
  return (
    <div className="dailyLogContainer">
      <form className="dailyLogForm">
        <div className="planLog">
          <div className="formArraySection">
            <div className="formHeading">
              <h3>Planned tasks </h3>{" "}
              <span title="Add a task you have planned for today">
                <MoreHelpIcon className="moreHelpIcon" />
              </span>
            </div>
            <FormArrayInput
              name="plannedTasks"
              ref={plannedTaskRef}
              onClick={handleArrayClick}
              data={newDailyLog.plannedTasks}
              setNewDailyLog={setNewDailyLog}
            />
          </div>
          <div className="formSelectSection">
            <div className="formHeading">
              <h3>Expected Focus</h3>
              <span title="What do you expect your focus level to be? 1-5 with 5 being the highest">
                <MoreHelpIcon className="moreHelpIcon" />
              </span>
            </div>
            <Select
              name="expectedFocus"
              onChange={handleChange}
              // options={options}
              min={0}
              max={5}
            />
          </div>
          <div className="formSelectSection">
            <div className="formHeading">
              <h3>Expected Hours</h3>
              <span title="How many hours do you expect to spend on your daily tasks?">
                <MoreHelpIcon className="moreHelpIcon" />
              </span>
            </div>
            <Select
              name="expectedHours"
              onChange={handleChange}
              options={options}
              min={0}
              max={8}
            />
          </div>
        </div>
        <div className="actualLog">
          <div className="formArraySection">
            <div className="formHeading">
              <h3>Actual Tasks</h3>
              <span title="Add a task you have completed today (you can update this later after completing a task)">
                <MoreHelpIcon className="moreHelpIcon" />
              </span>
            </div>
            <FormArrayInput
              name="actualTasks"
              ref={actualTaskRef}
              onClick={handleArrayClick}
              data={newDailyLog.actualTasks}
              setNewDailyLog={setNewDailyLog}
            />
          </div>
          <div className="formSelectSection">
            <div className="formHeading">
              <h3>Actual Focus</h3>
              <span title="What was your actual focus today? (you can always update this later)">
                <MoreHelpIcon className="moreHelpIcon" />
              </span>
            </div>
            <Select
              name="actualFocus"
              onChange={handleChange}
              options={options}
              min={0}
              max={5}
            />
          </div>
          <div className="formSelectSection">
            <div className="formHeading">
              <h3>Actual Hours</h3>
              <span title="How many hours did you spend on your planned tasks? (you can always update this later)">
                <MoreHelpIcon className="moreHelpIcon" />
              </span>
            </div>
            <Select
              name="actualHours"
              onChange={handleChange}
              options={options}
              min={0}
              max={8}
            />
          </div>
          <div className="formArraySection">
            <div className="formHeading">
              <h3>Distractions</h3>
              <span title="How many distractions did you have today. This is used to determine what distracts you the most">
                <MoreHelpIcon className="moreHelpIcon" />
              </span>
            </div>
            <FormArrayInput
              name="distractions"
              ref={distractionRef}
              onClick={handleArrayClick}
              data={newDailyLog.distractions}
              setNewDailyLog={setNewDailyLog}
            />
          </div>
        </div>
      </form>

      {variant === "edit" ? (
        <button
          className="saveLogBtn"
          onClick={async (e) => {
            e.preventDefault();
            await editDailyLog({
              id: data.dailyLog._id,
              payload: newDailyLog,
            });
            setOpenEditing(false);
          }}
        >
          Save your daily log updates
        </button>
      ) : (
        <button
          className="saveLogBtn"
          onClick={async () => mutateAsync(newDailyLog)}
        >
          Save your daily log
        </button>
      )}
    </div>
  );
};
