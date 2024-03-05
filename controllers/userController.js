const User = require('../models/User')

// GET user balance
const getUser = async (req, res) => {
  try {
    const user_id = req.user._id
    const user = await User.findById(user_id);
    if (!user) {
      throw new Error('User not found');
    }
    res.status(200).json(user)
  } catch (error) {
    throw new Error('Failed to get balance: ' + error.message);
  }

}

// UPDATE user balance
const updateBalance = async (userId, transactionAmount, transactionType) => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    transactionAmount = parseFloat(transactionAmount);

    if (isNaN(transactionAmount)) {
      throw new Error('Invalid transaction amount');
    }

    if (transactionType === 'Income') {
      user.balance += transactionAmount
      user.total_incomes += transactionAmount
    } else if (transactionType === 'Expense') {
      user.balance -= transactionAmount
      user.total_expenses += transactionAmount
    } else {
      throw new Error('Invalid transaction type')
    }

    await user.save()
  } catch (error) {
    throw new Error('Failed to update balance: ' + error.message)
  }
}

module.exports = {
  getUser,
  updateBalance,
}
