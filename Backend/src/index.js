import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./db.js";
import userRouter from "./routes/user.routes.js";

await connectDB();
const app = express();

app.use(express.json());
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
