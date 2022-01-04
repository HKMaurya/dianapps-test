/*******************************************************************************
 * Log Model
 ******************************************************************************/
'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamps');

//Define Log schema
const LogSchema = new Schema({
    message: { type: String, default: '' },
    info: { type: JSON },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    date: { type: Number, required: true }
});

//middle ware in serial
LogSchema.pre('save', (next) => {
    this.updated_at = Date.now();
    next();
});

// Add timestamp plugin
LogSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Log', LogSchema);
