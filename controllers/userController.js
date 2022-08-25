const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const cookieToken = require("../utils/cookieToken");

exports.signup = BigPromise(async (req, res, next) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return next(new CustomError("Please sign the message", 400));
  }

  const user = User.create({
    walletAddress
  })

  cookieToken(user, res);

});
