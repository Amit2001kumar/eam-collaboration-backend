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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjects = void 0;
const db_1 = __importDefault(require("../config/db"));
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId } = req.query;
        if (!teamId) {
            return res.status(400).json({ error: "Team ID is required." });
        }
        const [rows] = yield db_1.default.execute("SELECT * FROM projects WHERE team_id = ?", [
            teamId,
        ]);
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: "Failed to fetch projects." });
    }
});
exports.getProjects = getProjects;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { team_id, name, description } = req.body;
        const createdBy = req.user.id;
        const [result] = yield db_1.default.execute("INSERT INTO projects (team_id, name, description, created_by) VALUES (?, ?, ?, ?)", [team_id, name, description || null, createdBy]);
        res.status(201).json({ message: "Project created successfully", projectId: result.insertId });
    }
    catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: "Failed to create project." });
    }
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const [result] = yield db_1.default.execute("UPDATE projects SET name = IFNULL(?, name), description = IFNULL(?, description) WHERE id = ?", [name, description, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Project not found." });
        }
        res.json({ message: "Project updated successfully" });
    }
    catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: "Failed to update project." });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.execute("DELETE FROM projects WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Project not found." });
        }
        res.json({ message: "Project deleted successfully" });
    }
    catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: "Failed to delete project." });
    }
});
exports.deleteProject = deleteProject;
