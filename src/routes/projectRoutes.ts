import { Router } from "express";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController";
import { auth, authorize } from "../middleware/auth";
import { validate, schemas } from "../middleware/validation";

const router = Router();

// Route to get all projects for a team.
router.get("/", auth, getProjects);

// Route to create a new project. Requires ADMIN or MANAGER role.
router.post("/", auth, authorize(["ADMIN", "MANAGER"]), validate(schemas.createProject), createProject);

// Route to update an existing project. Requires ADMIN or MANAGER role.
router.put("/:id", auth, authorize(["ADMIN", "MANAGER"]), validate(schemas.updateProject), updateProject);

// Route to delete a project. Requires ADMIN role.
router.delete("/:id", auth, authorize(["ADMIN"]), deleteProject);

export default router;