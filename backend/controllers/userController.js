const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      userId,
      email,
      phoneNumber,
      password,
      monthlyIncome,
      savingsGoal,
      monthlyBudget
    } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const userIdExists = await User.findOne({ userId });
    if (userIdExists) {
      return res.status(400).json({ message: 'User ID is already taken' });
    }

    const newUser = new User({
      fullName,
      userId,
      email,
      phoneNumber,
      password,
      monthlyIncome,
      savingsGoal,
      monthlyBudget
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

module.exports = { registerUser };
