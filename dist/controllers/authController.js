"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        // Check if user already exists
        const [existingUsers] = yield db_1.default.execute("SELECT id FROM users WHERE email = ?", [email]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ error: "User with this email already exists." });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const [result] = yield db_1.default.execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role]);
        res.status(201).json({ message: "User registered successfully", userId: result.insertId });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const [rows] = yield db_1.default.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const user = rows[0];
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role, teamId: user.team_id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, teamId: user.team_id } });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
    }
});
exports.login = login;
