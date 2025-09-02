"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Route for user registration.
router.post("/register", (0, validation_1.validate)(validation_1.schemas.register), authController_1.register);
// Route for user login.
router.post("/login", (0, validation_1.validate)(validation_1.schemas.login), authController_1.login);
exports.default = router;
