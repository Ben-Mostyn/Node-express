import { useState } from "react";

const LogIn = ({ hasLoggedIn, setHasLoggedIn }) => {
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

      setHasLoggedIn(true);
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  return (
    <div>
      {!hasLoggedIn && (
        <>
          <h2>Log in to see your notes</h2>
          <form action="submit" onSubmit={handleSubmit}>
            <h3>Email</h3>
            <textarea
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            ></textarea>
            <h3>password</h3>
            <textarea
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </>
      )}

      {hasLoggedIn && <h1>Hello User</h1>}
    </div>
  );
};

export default LogIn;
