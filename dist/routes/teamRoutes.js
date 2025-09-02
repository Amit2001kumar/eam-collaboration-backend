"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamController_1 = require("../controllers/teamController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Route to get all teams.
router.get("/", auth_1.auth, teamController_1.getTeams);
// Route to create a new team. Requires ADMIN role.
router.post("/", auth_1.auth, (0, auth_1.authorize)(["ADMIN"]), (0, validation_1.validate)(validation_1.schemas.createTeam), teamController_1.createTeam);
// Route to update a team. Requires ADMIN role.
router.put("/:id", auth_1.auth, (0, auth_1.authorize)(["ADMIN"]), (0, validation_1.validate)(validation_1.schemas.updateTeam), teamController_1.updateTeam);
// Route to delete a team. Requires ADMIN role.
router.delete("/:id", auth_1.auth, (0, auth_1.authorize)(["ADMIN"]), teamController_1.deleteTeam);
exports.default = router;
