var http = require('http');
require('dotenv').config();

var port = process.env.PORT || 3000;
var options = {
  hostname: 'localhost',
  port: port,
  path: '/api/health',
  method: 'GET',
  timeout: 5000
};

var req = http.request(options, function (res) {
  var body = '';

  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    body += chunk;
  });

  res.on('end', function () {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('OK http://localhost:' + port + '/api/health');
      console.log(body);
      process.exit(0);
    }

    console.error('Health check failed with status ' + res.statusCode);
    console.error(body);
    process.exit(1);
  });
});

req.on('timeout', function () {
  req.destroy(new Error('Health check timed out.'));
});

req.on('error', function (error) {
  console.error('Health check failed: ' + (error.message || error.code || String(error)));
  process.exit(1);
});

req.end();
