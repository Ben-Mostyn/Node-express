import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import notesRouter from "./routes/notes.route.js";
import userRouter from "./routes/user.routes.js";
import connectDB from "./config/database.js";
import cors from "cors";

const port = process.env.PORT || 8000;
const app = express();

const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.error(error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

// middleware
app.use(express.json()); // parse Json
app.use(cors());

// custom middleware.
// Remember you need next() at the end of custom middleware, prebuilt middlware like express.json has next() in the background
app.use((req, res, next) => {
  console.log({ method: req.method, url: req.url });
  next();
});

app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/user", userRouter);

startServer();

export default app;
