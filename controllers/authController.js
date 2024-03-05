const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY)
}

// register
const register = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username: username })

    if (user) {
      return res.status(404).json({ error: 'Username is already used !' })
    }

    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      username,
      password: hashed,
      balance: 0,
    })

    delete newUser.password
    res.status(200).json(newUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// login
const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username: username })

    if (!user) {
      return res.status(404).json({ error: 'Username does not exist !' })
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return res.status(404).json({ error: 'Wrong password !' })
    }

    const token = createToken(user._id)

    res.status(200).json({ user, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  login,
  register,
}
