const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, monthlyIncome, savingsGoal, monthlyBudget } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      fullName,
      email,
      password,
      monthlyIncome,
      savingsGoal,
      monthlyBudget
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

module.exports = { registerUser };
