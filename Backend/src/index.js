import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./db.js";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";

await connectDB();
const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/projects/:projectId/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
