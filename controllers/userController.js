const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");

exports.signup = BigPromise(async (req, res, next) => {
  const {
    name,
    email,
    walletAddress,
    profileImg,
    coverImg,
    bookmarks,
    followers,
    followings,
    shortUrl,
    emailConfirmed,
  } = req.body;

  if (!walletAddress) {
    return next(new CustomError("Please sign the message", 400));
  }

  const user = await User.create({
    name,
    email,
    walletAddress,
    profileImg,
    coverImg,
    bookmarks,
    followers,
    followings,
    shortUrl,
    emailConfirmed,
  });

  cookieToken(user, res);
});
