const Blog = require("../models/blog");
const Category = require("../models/category");
const BigPromise = require("../middlewares/bigPromise");

exports.addBlog = BigPromise(async (req, res, next) => {
  req.body.user = req.user.id;
  const blog = await Blog.create(req.body);

  res.status(200).json({
    success: true,
    blog,
  });

});

exports.addCategory = BigPromise(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(200).json({
    success: true,
    category,
  });

});

exports.getAllBlogs = BigPromise(async (req, res, next) => {
const allBlogs = await Blog.find();

res.status(200).json({
  success: true,
  allBlogs,
});

});