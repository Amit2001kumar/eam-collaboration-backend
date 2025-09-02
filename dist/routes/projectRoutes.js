"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Route to get all projects for a team.
router.get("/", auth_1.auth, projectController_1.getProjects);
// Route to create a new project. Requires ADMIN or MANAGER role.
router.post("/", auth_1.auth, (0, auth_1.authorize)(["ADMIN", "MANAGER"]), (0, validation_1.validate)(validation_1.schemas.createProject), projectController_1.createProject);
// Route to update an existing project. Requires ADMIN or MANAGER role.
router.put("/:id", auth_1.auth, (0, auth_1.authorize)(["ADMIN", "MANAGER"]), (0, validation_1.validate)(validation_1.schemas.updateProject), projectController_1.updateProject);
// Route to delete a project. Requires ADMIN role.
router.delete("/:id", auth_1.auth, (0, auth_1.authorize)(["ADMIN"]), projectController_1.deleteProject);
exports.default = router;
