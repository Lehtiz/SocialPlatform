const router = require('express').Router();
const { body, validationResult, check } = require('express-validator');
const Message = require('../models/message');

// add
router.post(
  '/',
  body('text')
    .not()
    .isEmpty()
    .withMessage('message is required.')
    .isLength({ min: 1, max: 500 })
    .trim()
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newMessage = new Message(req.body);
    // TODO conversation must exist
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// get messages for conversation
router.get(
  '/:conversationId',
  check('conversationId').not().isEmpty().withMessage('conversationId is required.'),
  async (req, res) => {
    if (req.params.conversationId === 'null') res.status(400).json('null is not a valid id');
    try {
      const messages = await Message.find({ conversationId: req.params.conversationId });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
