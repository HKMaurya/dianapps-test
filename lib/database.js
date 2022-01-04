'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const db = require('../config/config').db;
mongoose.set('useCreateIndex', true);
mongoose.connect(db.url, db.options);
// mongoose.connect('mongodb://Hemant:Hem%40nt1p%40w%40n@gettingstart-shard-00-00.xq6rl.mongodb.net:27017,gettingstart-shard-00-01.xq6rl.mongodb.net:27017,gettingstart-shard-00-02.xq6rl.mongodb.net:27017/dianApp-db?ssl=true&replicaSet=GettingStart-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Database connection done');
  