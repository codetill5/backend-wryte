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
    // required: [true, "Please provide a email"],
    validate: [validator.isEmail, "Please enter a valid email"],
    default: "empty@somhing.com",
    unique: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  profileImg: {
    type: String,
  },
  coverImg: {
    type: String,
  },
  bookmarks: {
    type: Array,
  },
  followers: {
    type: Array,
  },
  followings: {
    type: Array,
  },
  shortUrl: {
    type: String,
  },
  emailConfirmed: {
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
