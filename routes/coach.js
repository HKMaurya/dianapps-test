'use strict';
const CoachController = require('../controllers/CoachController');
const validator = require('express-joi-validator');
const CoachSchema = require('../validations/coach-schema');

module.exports = (app) => {
    /**
   * @swagger
   *  /api/seat/booking:
   *    post:
   *      summary: Seat booking by user
   *      tags: [Coach]
   *      parameters:
   *        - in: header
   *          name: accept-language
   *          schema:
   *              type: string
   *              enum: [en, it]
   *          required: true
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/SeatBooking'
   *      responses:
   *        "200":
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/SeatBooking'
   */

  app.post('/api/seat/booking', validator(CoachSchema.seatBooking), (req, res) => {
    CoachController.seatBooking(req, res);
  });

  /**
   * @swagger
   *  /api/coaches:
   *    get:
   *      summary: Coaches List
   *      tags: [Coach]
   *      parameters:
   *        - in: header
   *          name: accept-language
   *          schema:
   *              type: string
   *              enum: [en, it]
   *          required: true
   *      responses:
   *        "200":
   *          description: Success
   */
   app.get('/api/coaches', (req, res) => {
    CoachController.coachList(req, res);
  });

}