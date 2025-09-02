import { Router } from "express";
import { register, login } from "../controllers/authController";
import { validate, schemas } from "../middleware/validation";
const router = Router();

// Route for user registration.
router.post("/register", validate(schemas.register), register);

// Route for user login.
router.post("/login", validate(schemas.login), login);

export default router;

