// Firstly we'll need to import the fs library
let fs = require('fs');
let dir = './logs';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, '0777');
}
// next we'll want make our Logger object available
// to whatever file references it.
let Logger = exports.Logger = {};


// Create 3 sets of write streams for the 3 levels of logging we wish to do
// every time we get an error we'll append to our error streams, any debug message
// to our debug stream etc...
let infoStream = fs.createWriteStream(dir+'/info.txt');
// Notice we set the path of our log files in the first parameter of
// fs.createWriteStream. This could easily be pulled in from a config
// file if needed.
let errorStream = fs.createWriteStream(dir+'/error.txt');
// createWriteStream takes in options as a second, optional parameter
// if you wanted to set the file encoding of your output file you could
// do so by setting it like so: ('logs/debug.txt' , { encoding : 'utf-8' });
let debugStream = fs.createWriteStream(dir+'/debug.txt');


// Finally we create 3 different functions
// each of which appends our given messages to
// their own log files along with the current date as an
// iso string and a \n newline character
Logger.info = (msg) => {
  let message = new Date().toISOString() + " : " + msg + "\n";
  infoStream.write(message);
};

Logger.debug = (msg) => {
  let message = new Date().toISOString() + " : " + msg + "\n";
  debugStream.write(message);
};

Logger.error = (msg) => {
  let message = new Date().toISOString() + " : " + msg + "\n";
  errorStream.write(message);
};
