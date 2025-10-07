import mongoose from "mongoose";

const Connection = async () => {
  const URL = "mongodb://user5000:test123@ac-ua3xpkr-shard-00-00.wjn6crc.mongodb.net:27017,ac-ua3xpkr-shard-00-01.wjn6crc.mongodb.net:27017,ac-ua3xpkr-shard-00-02.wjn6crc.mongodb.net:27017/?ssl=true&replicaSet=atlas-8twpgu-shard-0&authSource=admin&retryWrites=true&w=majority";

  try {
    await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting the database", error);
  }
};