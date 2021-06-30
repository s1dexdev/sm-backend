const Joi = require('joi');

const schemaCreateProject = Joi.object({
  name: Joi.string().min(4).max(50).required(),
  description: Joi.string().min(10).max(100),
});

const schemaUpdateProjectName = Joi.object({
  name: Joi.string().min(4).max(50).required(),
});

const schemaCreateSprint = Joi.object({
  name: Joi.string().min(4).max(50).required(),
  date: Joi.string().min(3).max(30).required(),
  duration: Joi.number().integer().required(),
});

const schemaCreateTask = Joi.object({
  name: Joi.string().min(4).max(50).required(),
  scheduledHours: Joi.number().integer().min(1).max(24).required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (error) {
    next({ status: 400, message: error.message.replace(/"/g, '') });
  }
};

module.exports.validateCreateProject = (req, _res, next) => {
  return validate(schemaCreateProject, req.body, next);
};

module.exports.validateUpdateProjectName = (req, _res, next) => {
  return validate(schemaUpdateProjectName, req.body, next);
};

module.exports.validateCreateSprint = (req, _res, next) => {
  return validate(schemaCreateSprint, req.body, next);
};

module.exports.validateCreateTask = (req, _res, next) => {
  return validate(schemaCreateTask, req.body, next);
};