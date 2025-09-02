"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Route to get all messages for a specific team.
router.get("/", auth_1.auth, messageController_1.getMessages);
// Route to create a new message.
router.post("/", auth_1.auth, (0, validation_1.validate)(validation_1.schemas.createMessage), messageController_1.createMessage);
exports.default = router;
