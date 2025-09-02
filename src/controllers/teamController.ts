import { Request, Response } from "express";
import db from "../config/db";

export const getTeams = async (req: Request, res: Response) => {
  const [rows]: any = await db.execute("SELECT * FROM teams");
  res.json(rows);
};

export const createTeam = async (req: Request, res: Response) => {
  const { name } = req.body;
  await db.execute("INSERT INTO teams (name) VALUES (?)", [name]);
  res.json({ message: "Team created" });
};

export const updateTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.execute("UPDATE teams SET name = ? WHERE id = ?", [name, id]);
  res.json({ message: "Team updated" });
};

export const deleteTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.execute("DELETE FROM teams WHERE id = ?", [id]);
  res.json({ message: "Team deleted" });
};
