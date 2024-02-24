const express = require('express')
const {
  getAllTransactions,
  getSingleTransaction,
  getByTypeTransactions,
  getByCategoryTransactions,
  getByNameTransactions,
  createTransaction,
} = require('../controllers/transactionController')
const verifyToken = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', verifyToken, getAllTransactions)

router.get('/:id', verifyToken, getSingleTransaction)

router.get('/type/:type', verifyToken, getByTypeTransactions)

router.get('/category/:category', verifyToken, getByCategoryTransactions)

router.get('/name/:name', verifyToken, getByNameTransactions)

router.post('/', verifyToken, createTransaction)

module.exports = router
