// Establish route
const router = require('express').Router();
const User = require('../models/user');

// REGISTER
// database call so we use async/await
router.get('/register', async (req, res) => {
  const user = await new User({
    username: 'test',
    email: 'test@tester.test',
    password: 'test1234'
  });

  // writing into db
  await user.save();
});

// Export route (make visible)
module.exports = router;
