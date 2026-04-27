function errorHandler(err, req, res, next) {
  var status = err.status || err.statusCode || 500;
  var isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    console.error(err);
  }

  res.status(status).json({
    ok: false,
    message: status === 500 ? '서버 처리 중 오류가 발생했습니다.' : err.message
  });
}

module.exports = errorHandler;
