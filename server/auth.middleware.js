const jwt = require('jsonwebtoken')
const { _Error } = require('./error.helpers')

function verifyToken(req, res, next) {
  try {
    const token = req.headers['authorization']?.replace('Bearer ', '')

    if (!token) {
      throw new _Error(403, 'No token provided')
    }

    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      if (err) {
        throw new _Error(401, 'Unauthorized')
      }
      req.userId = decoded.id
      next()
    })
  } catch (err) {
    next(err)
  }
}

module.exports = verifyToken