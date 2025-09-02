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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const db_1 = __importDefault(require("../config/db"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.query;
        if (!projectId) {
            return res.status(400).json({ error: "Project ID is required." });
        }
        const [rows] = yield db_1.default.execute("SELECT * FROM tasks WHERE project_id = ?", [
            projectId,
        ]);
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: "Failed to fetch tasks." });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_id, assigned_to, title, description, status } = req.body;
        const createdBy = req.user.id;
        const [result] = yield db_1.default.execute("INSERT INTO tasks (project_id, assigned_to, title, description, status, created_by) VALUES (?, ?, ?, ?, ?, ?)", [project_id, assigned_to || null, title, description || null, status || 'todo', createdBy]);
        res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: "Failed to create task." });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, status, assigned_to } = req.body;
        const [result] = yield db_1.default.execute("UPDATE tasks SET title = IFNULL(?, title), description = IFNULL(?, description), status = IFNULL(?, status), assigned_to = IFNULL(?, assigned_to) WHERE id = ?", [title, description, status, assigned_to, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Task not found." });
        }
        res.json({ message: "Task updated successfully" });
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: "Failed to update task." });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield db_1.default.execute("DELETE FROM tasks WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Task not found." });
        }
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: "Failed to delete task." });
    }
});
exports.deleteTask = deleteTask;
