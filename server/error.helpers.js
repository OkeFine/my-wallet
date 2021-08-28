class _Error extends Error {
  constructor(code, message) {
    super()
    this.code = code
    this.message = message
  }
}

function errorHanlder(err, req, res, next) {
  const { code = 500, message = 'Server Error!' } = err
  res.status(code).json({
    error: true,
    code,
    message,
  })
}


module.exports.errorHanlder = errorHanlder
module.exports._Error = _Error