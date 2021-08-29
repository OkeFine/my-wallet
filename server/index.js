const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const verifyToken = require('./auth.middleware')
const UserModel = require('./models/User')
const dotenv = require('dotenv')
const { errorHanlder, _Error } = require('./error.helpers')

const app = express()

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.urlencoded())
app.use(express.json())
dotenv.config()

const userFake = new UserModel({
  id: 1,
  email: 'user@gmail.com',
  wallet: '0xA58EE0f8A928dFa940dF2130f672659e5e36100B',
  password: '$2b$08$9AZ4B.R8xQ4anEpaLU7W8OXupzTH.2915zMcSSvt5mFi4z/7Ae2g2', // 123456
  assets: {
    USD: 1000,
    EUR: 50,
    YEN: 1200
  }
})

// ========== User Login =========
app.post('/auth', function (req, res, next) {
  try {
    const user = userFake.getInfo()
    if (user.email === req.body.email) {
      const isValidPass = bcrypt.compareSync(req.body.password, userFake.getHash())
      if (isValidPass) {
        const token = jwt.sign({
          id: user.id },
          process.env.APP_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRE
        });
        return res.json({ user, token })
      }
    }
    throw new _Error(401, 'Unlock info incorrect')
  } catch(err) {
    next(err)
  }
})

// ========== Send Asset =========
app.post('/send', verifyToken, function (req, res, next) {
  try {
    const { assetId, amount, to } = req.body
    // TODO: query user by req.userId
    const user = userFake.getInfo()
    // check asset capacity
    const current = user.assets[assetId]
    if (current && current >= amount) {
      // TODO: Send to receiver
      // Send Success => subtract the current amount of assets
      // response new assets info
      const assets = userFake.subtract(assetId, amount)
      return res.json({ success: true, assets })
    }
    throw new _Error(400, 'Not enough balance')
  } catch(err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  errorHanlder(err, req, res, next)
})

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})