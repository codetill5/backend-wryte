const express = require("express");
const router = express.Router();

const {
  addBlog,
  addCategory,
  getAllBlogs,
  getAllCatgories,
  addClaps,
  addReview,
  deleteReview,
  reply,
  allComments,
} = require("../controllers/blogController");
const { isLoggedIn } = require("../middlewares/user");

router.route("/upload/new").post(isLoggedIn, addBlog);
router.route("/blogs").get(getAllBlogs);
router.route("/add/category").post(isLoggedIn, addCategory);
router.route("/categories").get(getAllCatgories);
router.route("/clap/:id").get(isLoggedIn, addClaps);
router.route("/review").put(isLoggedIn, addReview);
router.route("/review").delete(isLoggedIn, deleteReview);
router.route("/reply").put(isLoggedIn, reply);
router.route("/comments/:id").get(isLoggedIn, allComments);


module.exports = router;
