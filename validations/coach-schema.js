const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

/**
 * @swagger
 *  components:
 *    schemas:
 *      SeatBooking:
 *        type: object
 *        required:
 *          - seat
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *            description: Name of the user.
 *          email:
 *            type: string
 *            format: email
 *            description: Email of the user.
 *          seat:
 *            type: number
 *            description: Number of seat.
 */
module.exports.seatBooking = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    seat: Joi.number().required().min(1).max(7)
  },
};