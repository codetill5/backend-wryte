const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  getLoggedInUserDetails,
  updateUserDetails,
  allUser,
} = require("../controllers/userController");
const { isLoggedIn, isAdmin } = require("../middlewares/user");

// User 
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/user").get(isLoggedIn, getLoggedInUserDetails);
router.route("/user/update").post(isLoggedIn, updateUserDetails);

//Admin
router.route("/admin/users").get(isLoggedIn, isAdmin('admin'), allUser);




module.exports = router;
