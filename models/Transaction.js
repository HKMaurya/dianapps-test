/*******************************************************************************
 * Transaction Model
 ******************************************************************************/
 'use strict';
 const mongoose = require('mongoose'),
   Schema = mongoose.Schema,
   timestamps = require('mongoose-timestamps');
 
 
 //Define Transaction schema
 const TransactionSchema = new Schema({
   name: { type: String, default: '' },
   email: { type: String, default: '' },
   noOfSeat: { type: Number, default: 0 },
   seats: [{ type: Number, default: 0 }]
 });
 
 // Add timestamp plugin
 TransactionSchema.plugin(timestamps, { index: true });
 
 module.exports = mongoose.model('Transaction', TransactionSchema);