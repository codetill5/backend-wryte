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
    return next(
      new CustomError(
        "Looks like you canceled signing of authentication message with your provider"
      )
    );
  }

  const user = await User.findOne({ walletAddress });

  if (!user) {
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
  }

  cookieToken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
    message: "Successfully logout"
  });
});


exports.getLoggedInUserDetails = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  
  res.status(200).json({
    success: true,
    user,
  });
});