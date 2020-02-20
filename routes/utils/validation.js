const { check, body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

const validateEmail = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("E-mail is required"),
  check("email")
    .trim()
    .isEmail()
    .withMessage("Invalid e-mail address")
];

const validateLogin = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("E-mail is required"),
  check("email")
    .trim()
    .isEmail()
    .withMessage("Invalid e-mail address"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required."),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  sanitizeBody("*").escape()
];

const validateRegister = [
  check("firstname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Firstname is required"),
  check("company")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Firstname is required"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("E-mail is required"),
  check("email")
    .trim()
    .isEmail()
    .withMessage("Invalid e-mail address"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required."),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  sanitizeBody("*").escape()
];

const validateUpdateEmployee = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("E-mail is required"),
  check("email")
    .trim()
    .isEmail()
    .withMessage("Invalid e-mail address"),
  sanitizeBody("*").escape()
];

const validateAddEmployee = [
  check("firstname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Firstname is required"),
  check("surname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Firstname is required"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("E-mail is required"),
  check("email")
    .trim()
    .isEmail()
    .withMessage("Invalid e-mail address"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required."),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  sanitizeBody("*").escape()
];

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      data: req.body,
      errors: errors.mapped()
    });
  }
  next();
};

module.exports = {
  validateEmail,
  validateAddEmployee,
  validateLogin,
  validateRegister,
  validateUpdateEmployee,
  checkValidation
};
