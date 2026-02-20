import { useState, useRef } from "react";
import { dailyLogCreate, dailyLogFetch } from "./DailyLogQueries";
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

  const actualTaskRef = useRef(null);
  const plannedTaskRef = useRef(null);
  const distractionRef = useRef(null);

  //! Delete once finished
  useEffect(() => {
    console.log({ newDailyLog });
  }, [newDailyLog]);

  const { data } = useQuery({
    queryFn: () => dailyLogFetch(date),
    queryKey: ["dailyLog"], // react query uses this key for caching etc
  });

  const { mutateAsync } = useMutation({
    mutationFn: dailyLogCreate,
  });

  const handleChange = (e, property) => {
    setNewDailyLog((prev) => ({
      ...prev,
      [property]: Number(e.target.value),
    }));
  };

  const handleArrayClick = (e, property, ref) => {
    const value = ref.current.value;
    setNewDailyLog((prev) => ({
      ...prev,
      [property]: [...prev[property], value],
    }));

    ref.current.value = "";
  };

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
                options={options}
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
    <div>
      <h1>This is the daily log</h1>
      <p>Expected focus {data?.dailyLog.expectedFocus}</p>
      <p>Actual focus {data?.dailyLog.actualFocus}</p>
      <p>Planned tasks {data?.dailyLog.plannedTasks}</p>
      <p>Actual tasks focus {data?.dailyLog.actualTasks}</p>
      <p>Distractions {data?.dailyLog.distractions}</p>
      <p>Expected hours {data?.dailyLog.expectedHours}</p>
    </div>
  );
};
