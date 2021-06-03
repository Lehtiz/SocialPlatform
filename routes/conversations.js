const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Conversation = require('../models/conversation');
const Message = require('../models/message');

router.post(
  '/',
  body('senderId').not().isEmpty().withMessage('senderId is required.').isLength({
    min: 4,
    max: 150
  }),
  body('receiverId').not().isEmpty().withMessage('receiverId is required.').isLength({
    min: 4,
    max: 150
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(400).json({ error: firstError });
    }
    // TODO check that conversation doesnt exist already

    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId]
    });
    try {
      await newConversation.save().then((result) => {
        res.status(200).json({
          savedConversation: result
        });
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// Delete a conversation
router.delete('/:id/delete', async (req, res) => {
  try {
    // get conversation with id
    const conversation = await Conversation.findById(req.params.id);

    // user must be either sender of receiverto delete
    if (conversation.members.includes(req.body.userId)) {
      // delete all related messages associated with the conversation
      await Message.deleteMany({
        conversationId: conversation._id
      });
      // delete conversation
      await conversation.deleteOne();
      // report success
      res
        .status(200)
        .json(`conversation with id:${req.params.id} deleted along with all it's messages`);
    } else {
      res.status(400).json('You can only delete your own conversations');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all conversations of a user
router.get('/:userId', async (req, res) => {
  try {
    const conversations = await Conversation.find({
      // check if userId in array, returns all hits
      members: { $in: [req.params.userId] }
    });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get conversation with id
router.get('/:conversationId/find', async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      // check if userId in array, returns all hits
      _id: req.params.conversationId
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get conversation between two users
router.get('/find/:firstUserId/:secondUserId', async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      // members must include both params
      members: { $all: [req.params.firstUserId, req.params.secondUserId] }
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
