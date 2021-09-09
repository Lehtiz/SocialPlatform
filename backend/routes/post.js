const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

// CREATE A POST
router.post('/', body('desc').isLength({ min: 1 }).trim(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE A POST
router.put('/:id', body('desc').isLength({ min: 1 }).trim(), async (req, res) => {
  try {
    // Find post
    const post = await Post.findById(req.params.id);
    // Check that user is author
    if (req.body.userId === post.userId) {
      // find post by id and edit
      await post.updateOne({ $set: req.body });
      res.status(200).json('Post has been updated');
    } else {
      res.status(500).json('You can only edit your own posts');
    }
  } catch (error) {
    res.status(500).json('Updating post failed');
  }
});

// DELETE A POST
router.delete('/:id/delete', async (req, res) => {
  try {
    // Find post
    const post = await Post.findById(req.params.id);
    // check that the user is author
    if (req.body.userId === post.userId) {
      await post.deleteOne();
      res.status(200).json('Post deleted');
    } else {
      res.status(500).json('You can only delete your own posts');
    }
  } catch (error) {
    res.status(500).json('Deleting post failed');
  }
});

// LIKE / UNLIKE A POST
router.put('/:id/like', async (req, res) => {
  try {
    // Find post
    const post = await Post.findById(req.params.id);

    // Check that the user has not liked already
    if (!post.likes.includes(req.body.userId)) {
      // Check that the user is not author
      if (req.body.userId !== post.userId) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json('Post liked');
      } else {
        res.status(500).json('You cannot like your own post');
      }
    } else {
      // If following already unlike
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('Post unliked');
    }
  } catch (error) {
    res.status(500).json('Liking post failed');
  }
});

// GET A POST
router.get('/:id', async (req, res) => {
  try {
    // Find post
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USERS AND FRIENDS TIMELINE POSTS
// api/post/timeline/all <- timeline alone conflicts with get post
router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    // get own posts
    const userPosts = await Post.find({ userId: currentUser._id });
    // use promise to get all awaits in
    const friendPosts = await Promise.all(
      // for each followed user get posts
      currentUser.followings.map((friendId) => Post.find({ userId: friendId }))
    );
    const allTimelinePosts = userPosts.concat(...friendPosts);
    // Take all userPosts and concat with friendPosts
    res.status(200).json(
      // sort posts newest first
      allTimelinePosts.sort((a, b) =>
        // eslint-disable-next-line no-nested-ternary
        a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
      )
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET only users posts
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
