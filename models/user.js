const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [40, "Name Should be under 40 characters"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please enter a valid email"],
    default: function () {
      const random = (Math.random() + 1).toString(36).substring(7).toString();
      return `${random}@noemail.com`;
    },
    unique: true,
    lowercase: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  profileImg: {
    type: String,
    default: function () {
      return (Math.floor(Math.random() * (5 - 0 + 1)) + 0).toString();
    },
  },
  bio: {
    type: String,
  },
  designation: {
    type: String,
  },
  coverImg: {
    type: String,
  },
  bookmarks: {
    type: Array,
  },
  followers: [
    {
      id: {
        type: String,
        required: true,
      },
    },
  ],
  followings: [
    {
      id: {
        type: String,
        required: true,
      },
    },
  ],
  shortUrl: {
    type: String,
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = mongoose.model("User", userSchema);
