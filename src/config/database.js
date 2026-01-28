import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.URI}`);
    console.log(`Mongo DB connected ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("connection failed", error);
    process.exit(1); // exit with failure
  }
};

export default connectDB;
