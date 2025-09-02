import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController";
import { auth } from "../middleware/auth";
import { validate, schemas } from "../middleware/validation";

const router = Router();

// Route to get all tasks for a project.
router.get("/", auth, getTasks);

// Route to create a new task.
router.post("/", auth, validate(schemas.createTask), createTask);

// Route to update an existing task.
router.put("/:id", auth, validate(schemas.updateTask), updateTask);

// Route to delete a task.
router.delete("/:id", auth, deleteTask);

export default router;