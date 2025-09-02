import { Request, Response } from "express";
import db from "../config/db";



export const getTasks = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required." });
    }
    const [rows]: any = await db.execute("SELECT * FROM tasks WHERE project_id = ?", [
      projectId,
    ]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};


export const createTask = async (req: Request, res: Response) => {
  try {
    const { project_id, assigned_to, title, description, status } = req.body;
    const createdBy = (req as any).user.id;
    const [result]: any = await db.execute(
      "INSERT INTO tasks (project_id, assigned_to, title, description, status, created_by) VALUES (?, ?, ?, ?, ?, ?)",
      [project_id, assigned_to || null, title, description || null, status || 'todo', createdBy]
    );
    res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: "Failed to create task." });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, assigned_to } = req.body;
    const [result]: any = await db.execute(
      "UPDATE tasks SET title = IFNULL(?, title), description = IFNULL(?, description), status = IFNULL(?, status), assigned_to = IFNULL(?, assigned_to) WHERE id = ?",
      [title, description, status, assigned_to, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: "Failed to update task." });
  }
};


export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result]: any = await db.execute("DELETE FROM tasks WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: "Failed to delete task." });
  }
};
