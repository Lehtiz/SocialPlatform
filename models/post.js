const mongoose = require('mongoose');

// Define a model for User
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true // user cannot be empty
    },
    desc: {
      type: String,
      max: 500,
      min: 1,
      required: true // post cannot be empty
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
