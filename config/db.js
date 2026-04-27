var sql = require('mssql');

var poolPromise;

var config = {
  server: process.env.DB_SERVER || process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 1433),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || process.env.DB_DATABASE,
  connectionTimeout: Number(process.env.DB_CONNECTION_TIMEOUT || 15000),
  requestTimeout: Number(process.env.DB_REQUEST_TIMEOUT || 15000),
  pool: {
    max: Number(process.env.DB_POOL_MAX || process.env.DB_CONNECTION_LIMIT || 10),
    min: Number(process.env.DB_POOL_MIN || 0),
    idleTimeoutMillis: Number(process.env.DB_POOL_IDLE_TIMEOUT || 30000)
  },
  options: {
    encrypt: parseBoolean(process.env.DB_ENCRYPT, false),
    trustServerCertificate: parseBoolean(process.env.DB_TRUST_SERVER_CERTIFICATE, true),
    enableArithAbort: true
  }
};

function getPool() {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .catch(function (error) {
        poolPromise = null;
        throw error;
      });
  }

  return poolPromise;
}

function closePool() {
  if (!poolPromise) {
    return Promise.resolve();
  }

  return poolPromise.then(function (pool) {
    poolPromise = null;
    return pool.close();
  });
}

function parseBoolean(value, defaultValue) {
  if (typeof value === 'undefined' || value === '') {
    return defaultValue;
  }

  return String(value).toLowerCase() === 'true';
}

module.exports = {
  sql: sql,
  getPool: getPool,
  closePool: closePool
};
