import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://borisfeze9:test1234@cluster0.nqpseaa.mongodb.net/next-js-crud"
  );
  console.log("db connected");
};
