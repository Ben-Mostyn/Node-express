import { useState, useRef } from "react";
import {
  dailyLogCreate,
  dailyLogFetch,
  dailyLogUpdate,
} from "./DailyLogQueries";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import "./dailyLog.css";
import { Select } from "../../Components/Select/Select";
import { FormArrayInput } from "../../Components/FormArrayInput/FormArrayInput";
import MoreHelpIcon from "../../Icons/MoreHelpIcon.svg?react";

// const date = new Date().toISOString().split("T")[0];
// const date = "1995-12-23"; //! This is a test date to show a prev log
const options = [0, 1, 2, 3, 4, 5];

export const DailyLog = ({ date }) => {
  const [newDailyLog, setNewDailyLog] = useState({
    date,
    plannedTasks: [],
    expectedFocus: 0,
    expectedHours: 0,
    actualHours: 0,
    actualTasks: [],
    actualFocus: 0,
    distractions: [],
  });
  const [openEditing, setOpenEditing] = useState(false);

  const actualTaskRef = useRef(null);
  const plannedTaskRef = useRef(null);
  const distractionRef = useRef(null);

  const { data } = useQuery({
    queryFn: () => dailyLogFetch(date),
    queryKey: ["dailyLog"], // react query uses this key for caching etc
  });

  const { mutateAsync } = useMutation({
    mutationFn: dailyLogCreate,
  });

  const { mutateAsync: editDailyLog } = useMutation({
    mutationFn: ({ id, payload }) => dailyLogUpdate(id, payload),
  });

  const handleChange = (e, property) => {
    setNewDailyLog((prev) => ({
      ...prev,
      [property]: Number(e.target.value),
    }));
  };

  //! Delete once finished
  useEffect(() => {
    console.log({ newDailyLog, data });
  }, [newDailyLog]);

  useEffect(() => {
    const saveData = () => {
      if (data) {
        setNewDailyLog((prev) => ({
          ...prev,
          plannedTasks: data.dailyLog.plannedTasks ?? [],
          expectedFocus: data.dailyLog.expectedFocus ?? 0,
          expectedHours: data.dailyLog.expectedHours ?? 0,
          actualHours: data.dailyLog.actualHours ?? 0,
          actualTasks: data.dailyLog.actualTasks ?? [],
          actualFocus: data.dailyLog.actualFocus ?? 0,
          distractions: data.dailyLog.distractions ?? [],
        }));
      }
    };

    saveData();
  }, [data]);

  const handleArrayClick = (e, property, ref) => {
    const value = ref.current.value;
    setNewDailyLog((prev) => ({
      ...prev,
      [property]: [...prev[property], value],
    }));

    ref.current.value = "";
  };
  const {
    expectedFocus,
    expectedHours,
    actualFocus,
    actualHours,
    distractions,
    plannedTasks,
    actualTasks,
  } = data?.dailyLog ?? {};

  if (!data?.dailyLog) {
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

        <button
          className="saveLogBtn"
          onClick={async () => mutateAsync(newDailyLog)}
        >
          Save your daily log
        </button>
      </div>
    );
  }

  return (
    <div className="dailyLogContainer">
      <form className="dailyLogForm">
        <div className="planLog">
          <h3>Planned tasks </h3>
          {plannedTasks}
          <h3>Expected focus </h3>
          {expectedFocus}
          <h3>Expected hours </h3>
          {expectedHours}
        </div>
        <div className="actualLog">
          <h3>Actual tasks </h3>
          {actualTasks ? actualTasks : <p>You have no added tasks</p>}
          <h3>Actual focus </h3>
          {actualFocus}
          <h3>Actual hours </h3>
          {actualHours}
          <h3>Distractions</h3>
          {distractions}
        </div>
      </form>
      <button onClick={() => setOpenEditing(true)}>Edit your Daily log</button>

      {openEditing && (
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
        </div>
      )}

      {/* <h1>This is the daily log</h1>
      <p>Expected focus {data?.dailyLog.expectedFocus}</p>
      <p>Actual focus {data?.dailyLog.actualFocus}</p>
      <p>Planned tasks {data?.dailyLog.plannedTasks}</p>
      <p>Actual tasks focus {data?.dailyLog.actualTasks}</p>
      <p>Distractions {data?.dailyLog.distractions}</p>
      <p>Expected hours {data?.dailyLog.expectedHours}</p> */}
    </div>
  );
};
