const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      ApiKeyAuth:
 *        type: apiKey
 *        in: header
 *        name: privatekey
 */
