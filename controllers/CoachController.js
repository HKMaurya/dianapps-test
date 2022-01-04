/*******************************************************************************
 * Coach Controller
 ******************************************************************************/
 'use strict';
 const mongoose = require('mongoose'),
   Coach = mongoose.model('Coach'),
   Transaction = mongoose.model('Transaction'),
   Logger = require('../helpers/logger'),
   CoachTransformer = require('../transformers/coach'),
   Q = require('q');

const seatBooking = async (req, res) => {
    try {
        const { name, email, seat } = req.body;
        let seats = [];
        const lastTransaction = await Q.all([ Transaction.findOne().sort({'_id':-1}).limit(1), Coach.findOne() ]);
        let lastBookedSeat = lastTransaction[0] ? lastTransaction[0].seats[lastTransaction[0].seats.length-1] : 0;
        if(lastBookedSeat + seat > 80) return res.boom.conflict(res.__('exceedingSeatLimit'));
        if(lastBookedSeat == 80) return res.boom.conflict(res.__('seatFull'));
        for(let i=0; i< seat; i++) {
            lastTransaction[1].seats[lastBookedSeat + i].isBooked = true;
            seats.push(lastBookedSeat + i + 1);
        }
        let txnData = { name, email, noOfSeat: seat, seats }
        let txn = new Transaction(txnData);
        await txn.save();
        //update coach
        await lastTransaction[1].save();
        res.status(200).send({
            success: true,
            message: res.__('seatBookingSuccess'),
            data: txn,
        });
    } catch (err) {
        Logger.add('Error add coaches ', err);
        return res.boom.badRequest(err);
    }
};

const coachList = async (req, res) => {
    try {
      let offset = req.query.page ? (req.query.page - 1) * req.query.limit : 0;
      let limit = parseInt(req.query.limit ? req.query.limit : 10);
      let query = {};
      let coaches = await Q.all([Coach.countDocuments(query).exec(), Coach.find(query).sort({ created_at: -1 }).skip(parseInt(offset)).limit(parseInt(limit))]);
      const result = {
        success: true,
        message: res.__('success'),
        data: CoachTransformer.coachList(coaches[1]),
        totalCount: coaches[0],
      };
      return res.status(200).send(result);
    } catch (err) {
      Logger.add('Coaches Listing Error ', err);
      return res.boom.badRequest(err);
    }
};

const addCoaches = async () => {
    try {
        let coachCount = await Coach.countDocuments();
        if(coachCount > 0) {
            console.log('Coaches added successfully');
        } else {
            let seats = [];
            for(let i=1; i<=80; i++) {
                seats.push({ seat: i, isBooked: false });
            }
            let coachObj = { name: 'Coach One', seats };
            let coach = new Coach(coachObj);
            await coach.save();
            console.log('Coaches added successfully');
        }
    } catch (err) {
        Logger.add('Error add coaches ', err);
        return res.boom.badRequest(err);
    }
};

module.exports = {
    addCoaches,
    coachList,
    seatBooking
};