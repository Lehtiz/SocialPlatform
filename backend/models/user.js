const mongoose = require('mongoose');

// Define a model for User
const UserSchema = new mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false
    },
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
    desc: {
      type: String,
      max: 100,
      default: ''
    },
    city: {
      type: String,
      max: 50,
      default: ''
    },
    from: {
      type: String,
      max: 50,
      default: ''
    },
    relationship: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 0
    }
  },
  // Automatically update timestamps everytime data is changed
  { timestamps: true }
);

// Export model as User
module.exports = mongoose.model('User', UserSchema);
