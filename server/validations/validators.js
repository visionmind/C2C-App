const { check } = require('express-validator/check');

exports.hasDescription = check('description')
  .isLength({ min: 5 })
  .withMessage('Description is required. Min length 5 characters');

exports.isEmail = check('email')
  .isEmail()
  .withMessage('Email field must have email type');

exports.hasPassword = check('password')
  .exists()
  .withMessage('Password must not be empty');

exports.hasName = check('name')
  .isLength()
  .withMessage('Name is required. Min length 5 characters');
