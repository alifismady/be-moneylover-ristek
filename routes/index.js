const express = require('express')
const authRoutes = require('./authRoutes')
const transactionRoutes = require('./transactionRoutes')
const userRoutes = require('./userRoutes')

const router = express.Router()

router.use('/api/auth', authRoutes)
router.use('/api/transactions',transactionRoutes)
router.use('/api/user', userRoutes)

module.exports = router
