/*******************************************************************************
 * Coach Model
 ******************************************************************************/
 'use strict';
 const mongoose = require('mongoose'),
   Schema = mongoose.Schema,
   timestamps = require('mongoose-timestamps');
 
//Define seat schema
const seatSchema = new Schema({
    seat: {
        type: Number,
        default: 1,
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
});

 //Define Coach schema
 const CoachSchema = new Schema({
   name: { type: String, default: '' },
   seats: [{ type: seatSchema }]
 });
 
 // Add timestamp plugin
 CoachSchema.plugin(timestamps, { index: true });
 
 module.exports = mongoose.model('Coach', CoachSchema);