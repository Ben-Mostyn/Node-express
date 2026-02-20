import { useEffect } from "react";
import { useState } from "react";
import LogIn from "../Login/LogIn";
import "./homepage.css";
import { DailyLog } from "../DailyLog/DailyLog";
// import jwt_decode from "jwt-decode";

const date = new Date().toISOString().split("T")[0];
const dateValues = new Date(date).toString().split(" ");
const displayDate = `${dateValues[1]} ${dateValues[2]} ${dateValues[3]}`;

const Homepage = () => {
  // const [notes, setNotes] = useState([]);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  //   const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      // wrap state updates in a function to avoid the warning
      const restoreUser = () => {
        setHasLoggedIn(true);
        setUser(JSON.parse(storedUser));
      };
      restoreUser();
    }
  }, []);

  return (
    <div className="homepage">
      {!hasLoggedIn && (
        <LogIn setHasLoggedIn={setHasLoggedIn} setUser={setUser} />
      )}

      {hasLoggedIn && (
        <>
          <div className="dailyLogHeading">
            <h2 className="date"> Daily Log</h2>
            <h3 className="date"> {displayDate}</h3>
          </div>
          <DailyLog date={date} />
        </>
      )}
    </div>
  );
};

export default Homepage;
