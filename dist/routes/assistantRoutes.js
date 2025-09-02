"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assistantController_1 = require("../controllers/assistantController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/ask", auth_1.auth, assistantController_1.handleAssistantRequest);
exports.default = router;
