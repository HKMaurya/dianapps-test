const express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  fs = require('fs'),
  path = require('path'),
  cons = require('consolidate'),
  Config = require('./config/config'),
  root = fs.realpathSync('.'),
  i18n = require('./i18n'),
  boom = require('express-boom'),
  app = express(),
  swaggerJsdoc = require('swagger-jsdoc'),
  swaggerUi = require('swagger-ui-express');
// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'DianApps',
      version: '1.0.0',
      description: 'DianApps API Documentation',
      license: {
        name: 'Hemant S.R.L.',
      },
      contact: {
        name: 'Hemant Maurya',
        email: 'sharewithmaurya@gmail.com',
      },
    },
    servers: [
      {
        url: Config.baseUrl,
        description: 'Production server',
      },
    ],
  },
  apis: ['./validations/**/*.js', './routes/**/*.js'],
};

const specs = swaggerJsdoc(options);
const cssOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'DianApps API docs',
  customfavIcon: '/lib/img/favicon.ico',
};
app.use('/api/dianapps/docs', swaggerUi.serve, swaggerUi.setup(specs, cssOptions));

require('./models');
require('./lib/database');
require('./lib/logger').Logger;
// process.env.TZ = Config.timeZone;
const CoachController = require('./controllers/CoachController');
CoachController.addCoaches();

//configuring vendor based middlewares
app.use('/lib', express.static(__dirname + '/lib/'));
app.use('/uploads', express.static(__dirname + '/uploads/'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(boom());
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,language,privatekey');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

//rendering engine
app.set('views', './');
app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.use(i18n);
require('./routes')(app);
app.use(i18n);

app.get('/*', (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

// Example error handler
app.use((err, req, res, next) => {
  if (err.isBoom) {
    if (err.output && err.output.statusCode == 400) {
      return res.status(err.output.statusCode).send({
        statusCode: 400,
        error: 'Bad Request',
        message: err.data[0].message,
      });
    } else {
      return res.status(err.output.statusCode).json(err.output.payload);
    }
  } else if (err) {
    let env = require('get-env')({
      staging: 'staging',
      test: 'test',
    });
    if (env == 'dev') {
      next(err);
    } else {
      return res.status(500).send({ error: err.toString() + ' in any file' });
    }
  }
});

//SERVER LISTENING
// let port = Config.server.port || 8080;
let port = process.env.PORT || 8080;
let server = app.listen(port, () => {
  let host = server.address().address;
  let port = server.address().port; //Route to Frontend to make socket connection
  console.log('Node server running at http://%s:%s. API in use: %s', host, port, app.get('env'));
});
