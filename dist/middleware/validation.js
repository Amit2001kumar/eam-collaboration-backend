"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
// Joi schemas for request validation
const schemas = {
    register: joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        role: joi_1.default.string().valid('ADMIN', 'MANAGER', 'MEMBER').optional(),
        team_id: joi_1.default.number().optional().allow(null),
    }),
    login: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
    createTeam: joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
    }),
    updateTeam: joi_1.default.object({
        name: joi_1.default.string().min(3).optional(),
        description: joi_1.default.string().optional(),
        admin_id: joi_1.default.number().optional().allow(null),
    }),
    createProject: joi_1.default.object({
        team_id: joi_1.default.number().required(),
        name: joi_1.default.string().min(3).required(),
        description: joi_1.default.string().optional().allow(null, ''),
    }),
    updateProject: joi_1.default.object({
        name: joi_1.default.string().min(3).optional(),
        description: joi_1.default.string().optional(),
        team_id: joi_1.default.number().optional(),
    }),
    createTask: joi_1.default.object({
        project_id: joi_1.default.number().required(),
        title: joi_1.default.string().min(3).required(),
        description: joi_1.default.string().optional().allow(null, ''),
        status: joi_1.default.string().valid('todo', 'in-progress', 'done').optional(),
        assigned_to: joi_1.default.number().optional().allow(null),
    }),
    updateTask: joi_1.default.object({
        title: joi_1.default.string().min(3).optional(),
        description: joi_1.default.string().optional().allow(null, ''),
        status: joi_1.default.string().valid('todo', 'in-progress', 'done').optional(),
        assigned_to: joi_1.default.number().optional().allow(null),
    }),
    createMessage: joi_1.default.object({
        team_id: joi_1.default.number().required(),
        sender_id: joi_1.default.number().required(),
        content: joi_1.default.string().required(),
    }),
};
exports.schemas = schemas;
// Middleware to validate against a schema
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.validate = validate;
