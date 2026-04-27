require('dotenv').config();

var path = require('path');
var express = require('express');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var notFoundHandler = require('./middleware/notFoundHandler');
var errorHandler = require('./middleware/errorHandler');

var app = express();
var port = normalizePort(process.env.PORT || '3000');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, function () {
  console.log('Server is running at http://localhost:' + port);
  console.log('Health check: http://localhost:' + port + '/api/health');
});

function normalizePort(value) {
  var parsedPort = parseInt(value, 10);

  if (isNaN(parsedPort)) {
    return value;
  }

  if (parsedPort >= 0) {
    return parsedPort;
  }

  return 3000;
}
