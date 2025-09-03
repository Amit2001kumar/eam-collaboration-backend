import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const [existingUsers]: any = await db.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result]: any = await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    res.status(201).json({ message: "User registered successfully", userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [rows]: any = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, teamId: user.team_id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, teamId: user.team_id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};
