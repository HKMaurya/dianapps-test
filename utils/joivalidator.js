const Joi = require('joi');
const Extend = require('extend');

const validate = (schema, options) => {
  options = options || {};
  const validateRequest = (req, res, next) => {
    let toValidate = {};
    /* istanbul ignore if */
    if (!schema) return next();
    ['params', 'body', 'query'].forEach((key) => {
      if (schema[key]) {
        toValidate[key] = req[key];
      }
    });
    return Joi.validate(toValidate, schema, options, onValidationComplete);
    function onValidationComplete(err, validated) {
      if(err) {
          return res.status(400).send({
            success: false,
            message: err.details[0].context.key,
            data: err.message
          });
      }
      // copy the validated data to the req object
      Extend(req, validated);
      return next();
    }
  }
  return validateRequest;
};

module.exports = {
  validate
}