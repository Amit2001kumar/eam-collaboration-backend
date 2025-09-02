import { Request, Response } from "express";
import db from "../config/db";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.query;
    if (!teamId) {
      return res.status(400).json({ error: "Team ID is required." });
    }
    const [rows]: any = await db.execute("SELECT * FROM projects WHERE team_id = ?", [
      teamId,
    ]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: "Failed to fetch projects." });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { team_id, name, description } = req.body;
    const createdBy = (req as any).user.id;
    const [result]: any = await db.execute(
      "INSERT INTO projects (team_id, name, description, created_by) VALUES (?, ?, ?, ?)",
      [team_id, name, description || null, createdBy]
    );
    res.status(201).json({ message: "Project created successfully", projectId: result.insertId });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: "Failed to create project." });
  }
};


export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const [result]: any = await db.execute(
      "UPDATE projects SET name = IFNULL(?, name), description = IFNULL(?, description) WHERE id = ?",
      [name, description, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found." });
    }
    res.json({ message: "Project updated successfully" });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: "Failed to update project." });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result]: any = await db.execute("DELETE FROM projects WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found." });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: "Failed to delete project." });
  }
};
