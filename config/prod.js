/*******************************************************************************
 * Put Server and Plugins configs here
 * ENV: Production
 ******************************************************************************/
 'use strict';
 const projectName = 'Dianapps',
   port = 8080,
   baseUrl = `https://dianapps.herokuapp.com`;
 
 module.exports = {
   env: 'prod',
   baseUrl,
   server: {
     host: '127.0.0.1',
     port: port,
   },
   product: {
     name: projectName,
   },
   db: {
     url: 'mongodb://Hemant:Hem%40nt1p%40w%40n@gettingstart-shard-00-00.xq6rl.mongodb.net:27017,gettingstart-shard-00-01.xq6rl.mongodb.net:27017,gettingstart-shard-00-02.xq6rl.mongodb.net:27017/dianApp-db?ssl=true&replicaSet=GettingStart-shard-0&authSource=admin&retryWrites=true&w=majority',
     options: {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     },
   }
 };