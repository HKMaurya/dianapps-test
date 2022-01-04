'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// const db = require('../config/config').db;
mongoose.set('useCreateIndex', true);
// mongoose.connect(db.url, db.options);
mongoose.connect('mongodb://127.0.0.1:27017/dianApp-db', { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Database connection done');
  