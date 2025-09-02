import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../config/db";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const [rows]: any = await db.execute("SELECT * FROM users WHERE id = ?", [
      decoded.id,
    ]);

    if (!rows.length) {
      return res.status(401).json({ error: "Invalid token" });
    }

    (req as any).user = rows[0];
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

// Role-based access
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};
