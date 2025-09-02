"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Route to get all tasks for a project.
router.get("/", auth_1.auth, taskController_1.getTasks);
// Route to create a new task.
router.post("/", auth_1.auth, (0, validation_1.validate)(validation_1.schemas.createTask), taskController_1.createTask);
// Route to update an existing task.
router.put("/:id", auth_1.auth, (0, validation_1.validate)(validation_1.schemas.updateTask), taskController_1.updateTask);
// Route to delete a task.
router.delete("/:id", auth_1.auth, taskController_1.deleteTask);
exports.default = router;
