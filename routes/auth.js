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
    await bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        // create a new user with the following info from post body
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword
        });

        // Save user into db
        const user = newUser.save();
        // respond with 200 success
        res.status(200).json(user);
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// Export route (make visible)
module.exports = router;
