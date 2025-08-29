import mongoose from "mongoose";

let connection = null;

const connectDB = async (uri) => {
  connection = await mongoose.connect(uri);
  return connection;
};

// attach getter
connectDB.connection = () => connection;

export default connectDB;
