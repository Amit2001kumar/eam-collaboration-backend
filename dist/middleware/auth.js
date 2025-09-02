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
exports.authorize = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return res.status(401).json({ error: "No token provided" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const [rows] = yield db_1.default.execute("SELECT * FROM users WHERE id = ?", [
            decoded.id,
        ]);
        if (!rows.length) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.user = rows[0];
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Unauthorized" });
    }
});
exports.auth = auth;
// Role-based access
const authorize = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!roles.includes(user.role)) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
};
exports.authorize = authorize;
