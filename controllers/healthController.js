function health(req, res) {
  res.json({
    ok: true,
    service: 'express-mssql-sp-app',
    status: 'running',
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  health: health
};
