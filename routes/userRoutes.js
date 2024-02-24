const express = require('express')
const {
  getBalance
} = require('../controllers/userController')

const verifyToken = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', verifyToken, getBalance)

module.exports = router