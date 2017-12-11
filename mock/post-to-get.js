//中间件，将POST请求转换为GET请求
module.exports = function (req, res, next) {
  req.method = "GET";
  next();
}
