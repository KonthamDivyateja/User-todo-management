import express from "express";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

export default app;
