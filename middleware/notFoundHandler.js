function notFoundHandler(req, res, next) {
  var error = new Error('요청한 리소스를 찾을 수 없습니다.');
  error.status = 404;
  next(error);
}

module.exports = notFoundHandler;
