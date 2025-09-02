import { Request, Response } from "express";
import db from "../config/db";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.query;
    if (!teamId) {
      return res.status(400).json({ error: "Team ID is required." });
    }
    const [rows]: any = await db.execute(
      "SELECT m.id, m.content, m.timestamp, u.id AS sender_id, u.name AS sender_name FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.team_id = ? ORDER BY m.timestamp ASC",
      [teamId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { team_id, sender_id, content } = req.body;
    await db.execute(
      "INSERT INTO messages (team_id, sender_id, content) VALUES (?, ?, ?)",
      [team_id, sender_id, content]
    );
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: "Failed to send message." });
  }
};
