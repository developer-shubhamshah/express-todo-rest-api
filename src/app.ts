import express from 'express';
import tasksRouter from "./routes/tasksRoutes";
import { errorHandler } from "./middlewares/errorMiddleware"
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json()); // parse json request
app.use("/tasks", tasksRouter);
app.use(errorHandler);

app.get("/",(req,res) => {
    res.send("Home Page");
});

export default app;