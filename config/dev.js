/*******************************************************************************
 * Put Server and Plugins configs here
 * ENV: Development
 ******************************************************************************/
'use strict';
const projectName = 'TestApp',
  port = 8080,
  baseUrl = `http://localhost:${port}`;

module.exports = {
  env: 'development',
  baseUrl,
  server: {
    host: '127.0.0.1',
    port: port,
  },
  product: {
    name: projectName,
  },
  db: {
    url: 'mongodb://127.0.0.1:27017/dianApp-db',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }
};
