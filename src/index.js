import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./server.js";

const port = process.env.PORT || 8000;

dotenv.config({
  path: "./.env",
});

const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log(error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
