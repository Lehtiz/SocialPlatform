const mongoose = require('mongoose');

// Define a model for User
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 2,
      max: 30,
      unique: true
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 512
    },
    profilePicture: {
      type: String,
      default: '' // default to empty string
    },
    coverPicture: {
      type: String,
      default: ''
    },
    followers: {
      type: Array,
      default: [] // default to empty array
    },
    followings: {
      type: Array,
      default: []
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  // Automatically update timestamps everytime data is changed
  { timestamps: true }
);

// Export model as User
module.exports = mongoose.model('User', UserSchema);
