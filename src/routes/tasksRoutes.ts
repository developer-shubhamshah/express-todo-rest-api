import express from "express"
import { getTask, createTask, updateTaskStatus, deleteTask } from "../controllers/taskController";
import { validateRequest } from "../middlewares/validateMiddleware";
import Joi from "joi";

const router = express.Router();

const createTaskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required()
});

const updateTaskSchema = Joi.object({
    status: Joi.string().valid('pending', 'completed').required()
});

router.post("/", validateRequest(createTaskSchema), createTask);
router.get("/", getTask);
router.patch("/:id", validateRequest(updateTaskSchema), updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;