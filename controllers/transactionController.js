const mongoose = require('mongoose')
const Transaction = require('../models/Transaction')
const { updateBalance } = require('./userController')

// GET all transactions
const getAllTransactions = async (req, res) => {
  try {
    const user_id = req.user._id

    const transactions = await Transaction.find({ user_id: user_id }).sort({
      createdAt: -1,
    })

    res.status(200).json(transactions)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

// GET single transaction
const getSingleTransaction = async (req, res) => {
  try {
    const user_id = req.user._id

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No Transaction' })
    }

    const transaction = await Transaction.find({ _id: id, user_id: user_id })

    if (!transaction) {
      res.status(404).json({ error: 'No Transaction ' })
    }

    res.status(200).json(transaction)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

// GET transactions by type
const getByTypeTransactions = async (req, res) => {
  try {
    const user_id = req.user._id

    const { type } = req.params

    const transactions = await Transaction.find({
      type: type,
      user_id: user_id,
    }).sort({
      createdAt: -1,
    })

    if (transactions.length === 0) {
      return res.status(404).json({ error: 'No Transactions' })
    }

    res.status(200).json(transactions)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

// GET transactions by category
const getByCategoryTransactions = async (req, res) => {
  try {
    const user_id = req.user._id

    const { category } = req.params

    const transactions = await Transaction.find({
      category: category,
      user_id: user_id,
    }).sort({
      createdAt: -1,
    })

    if (transactions.length === 0) {
      return res.status(404).json({ error: 'No Transactions' })
    }

    res.status(200).json(transactions)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

// GET transactions by name
const getByNameTransactions = async (req, res) => {
  try {
    const user_id = req.user._id

    const { name } = req.params

    const transactions = await Transaction.find({
      name: name,
      user_id: user_id,
    }).sort({
      createdAt: -1,
    })

    if (transactions.length === 0) {
      return res.status(404).json({ error: 'No Transactions' })
    }

    res.status(200).json(transactions)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

// CREATE new transaction
const createTransaction = async (req, res) => {
  const { name, amount, type, category } = req.body

  const user_id = req.user._id

  try {
    const transaction = await Transaction.create({
      name,
      amount,
      type,
      category,
      user_id: user_id,
    })

    await updateBalance(user_id, amount, type)

    res.status(200).json(transaction)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

module.exports = {
  getAllTransactions,
  getSingleTransaction,
  getByTypeTransactions,
  getByCategoryTransactions,
  getByNameTransactions,
  createTransaction,
}
