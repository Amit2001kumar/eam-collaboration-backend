import { Router } from "express";
import { getTeams, createTeam, updateTeam, deleteTeam } from "../controllers/teamController";
import { auth, authorize } from "../middleware/auth";
import { validate, schemas } from "../middleware/validation";

const router = Router();

// Route to get all teams.
router.get("/", auth, getTeams);

// Route to create a new team. Requires ADMIN role.
router.post("/", auth, authorize(["ADMIN"]), validate(schemas.createTeam), createTeam);

// Route to update a team. Requires ADMIN role.
router.put("/:id", auth, authorize(["ADMIN"]), validate(schemas.updateTeam), updateTeam);

// Route to delete a team. Requires ADMIN role.
router.delete("/:id", auth, authorize(["ADMIN"]), deleteTeam);

export default router;