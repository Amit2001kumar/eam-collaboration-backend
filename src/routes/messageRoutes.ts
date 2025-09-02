import { Router } from "express";
import { getMessages, createMessage } from "../controllers/messageController";
import { auth } from "../middleware/auth";
import { validate, schemas } from "../middleware/validation";
const router = Router();

// Route to get all messages for a specific team.
router.get("/", auth, getMessages);

// Route to create a new message.
router.post("/", auth, validate(schemas.createMessage), createMessage);

export default router;