const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");

exports.signup = BigPromise(async (req, res, next) => {
  const { walletAddress, name, email } = req.body;

  if (!walletAddress) {
    return next(new CustomError("Please sign the message", 400));
  }

  const user = await User.create({
    walletAddress,
    name, 
    email,
  });

  cookieToken(user, res);
});
