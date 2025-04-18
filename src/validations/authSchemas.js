// src/validations/authSchemas.js
import Joi from 'joi';

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
