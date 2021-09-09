const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true
    },
    sender: {
      type: String,
      required: true
    },
    text: {
      type: String,
      max: 500,
      min: 1,
      required: true
    }
  },
  // Automatically update timestamps everytime data is changed
  { timestamps: true }
);

// Export model as Message
module.exports = mongoose.model('Message', MessageSchema);
