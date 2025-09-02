import { Router } from "express";
import { handleAssistantRequest } from "../controllers/assistantController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/ask", auth, handleAssistantRequest);

export default router;
