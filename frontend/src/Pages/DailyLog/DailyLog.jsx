import { useState, useRef } from "react";
import {
  dailyLogCreate,
  dailyLogFetch,
  dailyLogUpdate,
} from "./DailyLogQueries";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./dailyLog.css";
import { DailyLogForm } from "../../Components/DailyLogForm/DailyLogForm";

// const date = new Date().toISOString().split("T")[0];
// const date = "1995-12-23"; //! This is a test date to show a prev log

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
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryFn: () => dailyLogFetch(date),
    queryKey: ["dailyLog", date], // react query uses this key for caching etc
  });

  const { mutateAsync } = useMutation({
    mutationFn: dailyLogCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyLog", date] });
    },
  });

  const { mutateAsync: editDailyLog } = useMutation({
    mutationFn: ({ id, payload }) => dailyLogUpdate(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dailyLog", date] });
    },
  });

  const handleChange = (e, property) => {
    setNewDailyLog((prev) => ({
      ...prev,
      [property]: Number(e.target.value),
    }));
  };

  useEffect(() => {
    const saveData = () => {
      if (data?.dailyLog) {
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
      <DailyLogForm
        plannedTaskRef={plannedTaskRef}
        newDailyLog={newDailyLog}
        setNewDailyLog={setNewDailyLog}
        actualTaskRef={actualTaskRef}
        distractionRef={distractionRef}
        mutateAsync={mutateAsync}
        handleArrayClick={handleArrayClick}
        handleChange={handleChange}
        editDailyLog={editDailyLog}
        data={data}
        setOpenEditing={setOpenEditing}
      />
    );
  }

  return (
    <div className="dailyLogContainer">
      <div className="dailyLogForm">
        <div className="planLog">
          <h3>Planned tasks </h3>
          {plannedTasks.length ? (
            <ul className="arrayList">
              {" "}
              {plannedTasks.map((item) => (
                <li className="arrayItem">{item}</li>
              ))}{" "}
            </ul>
          ) : (
            <p>You havevn't added any planned tasks</p>
          )}
          <h3>Expected focus </h3>
          {expectedFocus}
          <h3>Expected hours </h3>
          {expectedHours}
        </div>
        <div className="actualLog">
          <h3>Actual tasks </h3>
          {actualTasks.length ? (
            <ul className="arrayList">
              {actualTasks.map((item) => (
                <li className="arrayItem">{item}</li>
              ))}
            </ul>
          ) : (
            <p>You haven't added any completed tasks</p>
          )}
          <h3>Actual focus </h3>
          {actualFocus}
          <h3>Actual hours </h3>
          {actualHours}
          <h3>Distractions</h3>
          {distractions.length ? (
            <ul className="arrayList">
              {distractions.map((item) => (
                <li className="arrayItem">{item}</li>
              ))}
            </ul>
          ) : (
            <p>You haven't added any distractions</p>
          )}
        </div>
      </div>
      <button onClick={() => setOpenEditing(true)}>Edit your Daily log</button>

      {openEditing && (
        <DailyLogForm
          plannedTaskRef={plannedTaskRef}
          newDailyLog={newDailyLog}
          setNewDailyLog={setNewDailyLog}
          actualTaskRef={actualTaskRef}
          distractionRef={distractionRef}
          mutateAsync={mutateAsync}
          handleArrayClick={handleArrayClick}
          handleChange={handleChange}
          editDailyLog={editDailyLog}
          data={data}
          setOpenEditing={setOpenEditing}
          variant="edit"
        />
      )}
    </div>
  );
};
