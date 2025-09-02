import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Joi schemas for request validation
const schemas = {
  register: Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('ADMIN', 'MANAGER', 'MEMBER').optional(),
    team_id: Joi.number().optional().allow(null),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  createTeam: Joi.object({
    name: Joi.string().min(3).required(),
  }),
  updateTeam: Joi.object({
    name: Joi.string().min(3).optional(),
    description: Joi.string().optional(),
    admin_id: Joi.number().optional().allow(null),
  }),
  createProject: Joi.object({
    team_id: Joi.number().required(),
    name: Joi.string().min(3).required(),
    description: Joi.string().optional().allow(null, ''),
  }),
  updateProject: Joi.object({
    name: Joi.string().min(3).optional(),
    description: Joi.string().optional(),
    team_id: Joi.number().optional(),
  }),
  createTask: Joi.object({
    project_id: Joi.number().required(),
    title: Joi.string().min(3).required(),
    description: Joi.string().optional().allow(null, ''),
    status: Joi.string().valid('todo', 'in-progress', 'done').optional(),
    assigned_to: Joi.number().optional().allow(null),
  }),
  updateTask: Joi.object({
    title: Joi.string().min(3).optional(),
    description: Joi.string().optional().allow(null, ''),
    status: Joi.string().valid('todo', 'in-progress', 'done').optional(),
    assigned_to: Joi.number().optional().allow(null),
  }),
  createMessage: Joi.object({
    team_id: Joi.number().required(),
    sender_id: Joi.number().required(),
    content: Joi.string().required(),
  }),
};

// Middleware to validate against a schema
const validate = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export { validate, schemas };
