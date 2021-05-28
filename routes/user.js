const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Setup for bcrypt
const saltRounds = 10;

// UPDATE USER
router.put('/:id', async (req, res) => {
  // Verify selected userId equals to userId give in param, also if user is Admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        // salt new password
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      // find used by id and update all values given in body
      await User.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.status(200).json('Account has been updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can only update your account');
  }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json('You can only delete your account');
  }
});

// GET A USER
router.get('/', async (req, res) => {
  const { userId } = req.query;
  const { username } = req.query;
  try {
    // use username to fetch user
    const user = userId ? await User.findById(userId) : await User.findOne({ username });
    // Strip not wanted data like password from result, pass other
    const { password, ...other } = user._doc;
    // return other data
    res.status(200).json(other);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get users followings
router.get('/:userId/friends', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(user.followings.map((friendId) => User.findById(friendId)));
    const friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      return friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// FOLLOW A USER
router.put('/:id/follow', async (req, res) => {
  // Check that user followed is not user following (self)
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // Check currentUser is not already following user
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json('User has been followed');
      }
      // If currentUser already follows
      else {
        res.status(403).json('You are already following this user');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('You cannot follow yourself');
  }
});

// UNFOLLOW A USER
router.put('/:id/unfollow', async (req, res) => {
  // Check that user followed is not user following (self)
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // Check currentUser is already following user
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json('User has been unfollowed');
      }
      // If currentUser is not following
      else {
        res.status(403).json('You are not following this user');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('You cannot unfollow yourself');
  }
});

// Export route (make visible)
module.exports = router;
