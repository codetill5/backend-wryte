const express = require("express");
const router = express.Router();

const {
  addBlog,
  addCategory,
  getAllBlogs,
  getAllCatgories,
} = require("../controllers/blogController");
const { isLoggedIn } = require("../middlewares/user");

router.route("/upload/new").post(isLoggedIn, addBlog);
router.route("/blogs").get(getAllBlogs);
router.route("/add/category").post(isLoggedIn, addCategory);
router.route("/categories").get(getAllCatgories);

module.exports = router;