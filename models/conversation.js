const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array
    }
  },
  // Automatically update timestamps everytime data is changed
  { timestamps: true }
);

// Export model as Conversation
module.exports = mongoose.model('Conversation', ConversationSchema);
