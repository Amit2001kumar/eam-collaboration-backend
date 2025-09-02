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
exports.createMessage = exports.getMessages = void 0;
const db_1 = __importDefault(require("../config/db"));
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId } = req.query;
        if (!teamId) {
            return res.status(400).json({ error: "Team ID is required." });
        }
        const [rows] = yield db_1.default.execute("SELECT m.id, m.content, m.timestamp, u.id AS sender_id, u.name AS sender_name FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.team_id = ? ORDER BY m.timestamp ASC", [teamId]);
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: "Failed to fetch messages." });
    }
});
exports.getMessages = getMessages;
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { team_id, sender_id, content } = req.body;
        yield db_1.default.execute("INSERT INTO messages (team_id, sender_id, content) VALUES (?, ?, ?)", [team_id, sender_id, content]);
        res.status(201).json({ message: "Message sent successfully" });
    }
    catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: "Failed to send message." });
    }
});
exports.createMessage = createMessage;
