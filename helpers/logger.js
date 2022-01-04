/*******************************************************************************
 * Logger Helper
 ******************************************************************************/
'use strict';
const mongoose = require('mongoose'),
    Log = mongoose.model('Log');

exports.add = (text, info) => {
    let now = new Date();
    let d = now.getDate();
    let m = now.getMonth() + 1;
    let y = now.getFullYear();
    let logs = new Log({ year: y, month: m, date: d, message: text, info: info });
    logs.save((err, logs) => { });
};
