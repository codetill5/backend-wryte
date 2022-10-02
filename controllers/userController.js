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
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Successfully logout",
  });
});

exports.getLoggedInUserDetails = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUserDetails = BigPromise(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    profileImg: req.body.profileImg,
    coverImg: req.body.coverImg,
    shortUrl: req.body.shortUrl,
    bio: req.body.bio,
    designation: req.body.designation
  };

  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.getUserById = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new CustomError("No user found", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Admin
exports.allUser = BigPromise(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getSingleUser = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new CustomError("No user found", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUser = BigPromise(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User updated",
  });
});

exports.deleteUser = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new CustomError("No such user found!", 401));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted",
  });
});

exports.follow = BigPromise(async (req, res, next) => {
  const { userId } = req.body;

  const following = {
    id: userId,
  };

  const user = await User.findById(req.user._id);
  user.followings.push(following);

  await user.save({ validateBeforeSave: false });

  const follower = {
    id: req.user._id,
  };

  const user2 = await User.findById(userId);
  user2.followers.push(follower);

  await user2.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "followed",
  });
});


//check
exports.unFollow = BigPromise(async (req, res, next) => {
  const { userId } = req.body;

  const user = await User.findById(req.user._id);
  // user.followings.filter((item) => item.id !== userId);
  // user.followings
  // await user.update({ validateBeforeSave: false });
const id = "hello";
  await User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $pull: {
        followings: userId,
      },
    }
  );

  // const user2 = await User.findById(userId);
  // user2.followers.filter((item) => item.id !== req.user._id);

  // await user2.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "unfollowed",
  });
});