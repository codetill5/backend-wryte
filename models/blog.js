const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  tokenId: {
    type: String,
  },
  category: {
    type: Array,
    required: true,
  },
  claps: {
    type: Number,
    default: 0,
  },
  numberOfComments: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      walletAddress: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  reply: [
    {
      id: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
