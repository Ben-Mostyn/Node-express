import { useState } from "react";
import "./Login.css";

const LogIn = ({ hasLoggedIn, setHasLoggedIn, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("failed logging in", res.status);
      }

      const data = await res.json();

      //! set token
      localStorage.setItem("token", data.token);
      //! set user
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      console.log(data);

      setHasLoggedIn(true);
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  return (
    <div className="loginModal">
      {!hasLoggedIn && (
        <>
          <h2>Log in to see your notes</h2>
          <form action="submit" onSubmit={handleSubmit}>
            <div className="formSection">
              <h3>Email</h3>
              <textarea
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                aria-label="email"
              ></textarea>
            </div>
            <div className="formSection">
              <h3>password</h3>
              <textarea
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                aria-label="password"
              ></textarea>
            </div>
            <div>
              <button
                className="logInBtn"
                aria-label="login-submit"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default LogIn;
