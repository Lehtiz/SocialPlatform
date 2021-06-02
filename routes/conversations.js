const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Conversation = require('../models/conversation');

// new conversation body('senderId').isLength({ min: 2 }).trim().escape(),
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
      // res.status(200).json(savedConversation);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// get conversations of a user
router.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      // check if userId in array, returns all hits
      members: { $in: [req.params.userId] }
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
