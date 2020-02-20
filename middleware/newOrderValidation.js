/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable linebreak-style */
const {
  check
} = require('express-validator/check');


module.exports = function (req, res, next) {

  check('number', 'number is required').isNumeric();
  check('name', 'name is required').not().isEmpty();
  check('finishDate', 'date is required').not().isEmpty();
  check('color', 'color is required').not().isEmpty();
  check('paintType', 'paintType is required').not().isEmpty();
  check('elements', 'number of elements is required').not().isEmpty();
  next()

};