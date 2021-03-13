const Joi = require("joi");

const registerUser = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().min(3).max(255).required().label("Name"),
    email: Joi.string().email().min(6).required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  });

  return userSchema.validate(data);
};

const loginUser = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().email().min(6).required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  });

  return userSchema.validate(data);
};

module.exports = {
  registerUser,
  loginUser,
};
