const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const User = require('../models/User');
router.post('/register', registerUser);

// Login route
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body; // Changed from 'email' to 'identifier'

  try {
    // Check if user exists by email OR userId
    const user = await User.findOne({
      $or: [{ email: identifier }, { userId: identifier }],
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email/user ID or password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        fullName: user.fullName,
        email: user.email,
        userId: user.userId,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
});
module.exports = router;

