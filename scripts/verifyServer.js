var http = require('http');
var spawn = require('child_process').spawn;
require('dotenv').config();

var port = process.env.PORT || 3000;
var child = spawn(process.execPath, ['server.js'], {
  cwd: process.cwd(),
  env: process.env,
  stdio: ['ignore', 'pipe', 'pipe']
});

var settled = false;
var timeout = setTimeout(function () {
  finish(new Error('Server verification timed out.'));
}, 10000);

child.stdout.on('data', function (chunk) {
  process.stdout.write(chunk);
  requestHealth();
});

child.stderr.on('data', function (chunk) {
  process.stderr.write(chunk);
});

child.on('exit', function (code) {
  if (!settled) {
    finish(new Error('Server exited before verification. Exit code: ' + code));
  }
});

function requestHealth() {
  if (settled) {
    return;
  }

  http.get('http://localhost:' + port + '/api/health', function (res) {
    var body = '';

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log('Verified http://localhost:' + port);
        console.log(body);
        finish();
        return;
      }

      finish(new Error('Health endpoint returned status ' + res.statusCode));
    });
  }).on('error', function (error) {
    finish(error);
  });
}

function finish(error) {
  if (settled) {
    return;
  }

  settled = true;
  clearTimeout(timeout);

  if (child && !child.killed) {
    child.kill();
  }

  if (error) {
    console.error('Verification failed: ' + (error.message || error.code || String(error)));
    process.exit(1);
  }

  process.exit(0);
}
