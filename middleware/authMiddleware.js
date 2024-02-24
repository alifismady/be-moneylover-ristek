const jwt = require('jsonwebtoken')
const User = require('../models/User')

const verifyToken = async (req, res, next) => {
  try {
    let authHeader = req.header('Authorization')
    if (!authHeader) {
      return res.status(403).json({ msg: 'User not logged in' })
    }

    const token = authHeader && authHeader.split(' ')[1]

    const {_id} = jwt.verify(token, process.env.SECRET_KEY)
    const user_id = await User.findOne({_id}).select('_id')
    req.user = user_id
    next()
  } catch (error) {
    res.status(400).json({ error: error.message, msg: 'Request not Authorized' })
  }
}

module.exports = verifyToken
