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
exports.deleteTeam = exports.updateTeam = exports.createTeam = exports.getTeams = void 0;
const db_1 = __importDefault(require("../config/db"));
const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.default.execute("SELECT * FROM teams");
    res.json(rows);
});
exports.getTeams = getTeams;
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    yield db_1.default.execute("INSERT INTO teams (name) VALUES (?)", [name]);
    res.json({ message: "Team created" });
});
exports.createTeam = createTeam;
const updateTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    yield db_1.default.execute("UPDATE teams SET name = ? WHERE id = ?", [name, id]);
    res.json({ message: "Team updated" });
});
exports.updateTeam = updateTeam;
const deleteTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db_1.default.execute("DELETE FROM teams WHERE id = ?", [id]);
    res.json({ message: "Team deleted" });
});
exports.deleteTeam = deleteTeam;
