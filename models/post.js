const mongoose = require('mongoose');

// Define a model for User
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      max: 500,
      min: 1
    },
    img: {
      type: String
    },
    likes: {
      type: Array
    }
  },
  // Automatically update timestamps everytime data is changed
  { timestamps: true }
);

// Export model as User
module.exports = mongoose.model('Post', PostSchema);
