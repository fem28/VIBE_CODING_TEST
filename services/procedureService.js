var db = require('../config/db');

function callProcedure(procedureName, params) {
  assertSafeProcedureName(procedureName);

  return db.getPool().then(function (pool) {
    var request = pool.request();

    appendInputs(request, params);

    return request.execute(procedureName);
  }).then(function (result) {
    return normalizeProcedureResult(result);
  });
}

function appendInputs(request, params) {
  if (!params) {
    return;
  }

  if (Array.isArray(params)) {
    params.forEach(function (value, index) {
      request.input('param' + (index + 1), value);
    });
    return;
  }

  Object.keys(params).forEach(function (name) {
    var safeName = normalizeParameterName(name);
    request.input(safeName, params[name]);
  });
}

function normalizeProcedureResult(result) {
  if (result.recordset) {
    return result.recordset;
  }

  if (result.recordsets && result.recordsets.length > 0) {
    return result.recordsets[0];
  }

  return [];
}

function assertSafeProcedureName(procedureName) {
  if (!/^[a-zA-Z0-9_]+$/.test(procedureName)) {
    var error = new Error('Invalid stored procedure name.');
    error.status = 500;
    throw error;
  }
}

function normalizeParameterName(name) {
  var safeName = String(name).replace(/^@/, '');

  if (!/^[a-zA-Z0-9_]+$/.test(safeName)) {
    var error = new Error('Invalid stored procedure parameter name.');
    error.status = 500;
    throw error;
  }

  return safeName;
}

module.exports = {
  callProcedure: callProcedure
};
