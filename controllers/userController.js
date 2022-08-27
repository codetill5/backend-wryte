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


exports.login = BigPromise(async (req, res, next) => {
  const { name, email, walletAddress, profileImg, coverImg, bookmarks, followers, followings, shortUrl, emailConfirmed } = req.body

  if(!walletAddress) {
    return next(new CustomError('Looks like you canceled signing of authentication message with your provider'))
  }

  const user = await User.findOne({walletAddress});

  if(!user) {
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

  cookieToken(user, res)
  }

  cookieToken(user, res)
})