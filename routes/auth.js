// Establish route
const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Setup for bcrypt
const saltRounds = 10;

// REGISTER
// database call so we use async/await
router.post('/register', async (req, res) => {
  try {
    // Turn cleartext password into hashed one before saving to db
    await bcrypt.hash(req.body.password, saltRounds, (error, hashedPassword) => {
      // create a new user with the following info from post body
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      });

      // Save user into db
      newUser.save();
      // respond with 200 success
      res.status(200).json(newUser);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    // Find from db unique user by email
    const user = await User.findOne({ email: req.body.email });
    // If no user found send 404 not found
    if (!user) res.status(404).json('User not found');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) res.status(400).json('wrong password');

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Export route (make visible)
module.exports = router;
