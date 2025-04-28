import { Request, Response } from "express";
import Boom from '@hapi/boom';

import { Task } from "../models/task"

let tasks: Task[] = [];

let currentId = 1;

export const createTask = (req: Request, res: Response) => {
    const { title, description } = req.body;
    const newTask: Task = {
        id: currentId++,
        title,
        description,
        status: "pending"
    }
    tasks.push(newTask);
    res.status(201).json(newTask);
};

export const getTask = (req: Request, res: Response) => {
    const { page = 1, limit = 10, status } = req.query as { page?: string; limit?: string; status?: string };

    let filteredTasks = tasks;

    if(status) {
        filteredTasks = filteredTasks.filter(key => key.status === status)
    }

    const start = ((+page) - 1) * (+limit);
    const end = start + (+limit);
    res.json(filteredTasks.slice(start, end));
};

export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const task = tasks.find(key => key.id === id);
    if(!task) {
        throw Boom.notFound('Task not found');
    }

    task.status = status;
    res.json(task);
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
        throw Boom.notFound('Task not found');
    }

    tasks.splice(index, 1);
    res.json({ message: "Task Deleted Successfully" });
};