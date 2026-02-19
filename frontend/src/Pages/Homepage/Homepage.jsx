import { useEffect } from "react";
import { useState } from "react";
import LogIn from "../Login/LogIn";
import "./homepage.css";
import { DailyLog } from "../DailyLog/DailyLog";
// import jwt_decode from "jwt-decode";

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
          <h1>Welcome {user.username}</h1>
          <DailyLog />
        </>
      )}
    </div>
  );
};

export default Homepage;
