const User = require('../models/User')

// GET user balance
const getBalance = async (req, res) => {
  try {
    const user_id = req.user._id
    const user = await User.findById(user_id);
    if (!user) {
      throw new Error('User not found');
    }
    res.status(200).json({ balance: user.balance })
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
    if (transactionType === 'Income') {
      user.balance += transactionAmount
    } else if (transactionType === 'Expense') {
      user.balance -= transactionAmount
    } else {
      throw new Error('Invalid transaction type')
    }

    await user.save()
  } catch (error) {
    throw new Error('Failed to update balance: ' + error.message)
  }
}

module.exports = {
  getBalance,
  updateBalance,
}
