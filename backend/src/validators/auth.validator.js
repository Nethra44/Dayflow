const Joi = require("joi");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().valid("employee", "hr", "admin").default("employee"),
  department: Joi.string().optional(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { signupSchema, signinSchema };
