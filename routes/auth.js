// Establish route
const router = require('express').Router();
const User = require('../models/user');

// REGISTER
// database call so we use async/await
router.post('/register', async (req, res) => {
  // create a new user with the following info from post body
  const newUser = await new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  // Save user into db
  try {
    const user = await newUser.save();
    // respond with 200 success
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// Export route (make visible)
module.exports = router;
