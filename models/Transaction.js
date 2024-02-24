const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    user_id: {
      type: String,
      required: true
    }
  }, 
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema)