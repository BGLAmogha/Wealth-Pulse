const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  userId: { type: String, unique: true },
  email: { type: String, unique: true },
  phoneNumber: { type: String },
  password: String,
  monthlyIncome: Number,
  savingsGoal: Number,
  monthlyBudget: Number,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
