const Blog = require("../models/blog");
const Category = require("../models/category");
const BigPromise = require("../middlewares/bigPromise");
const WhereClause = require("../utils/whereClause");

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

exports.getAllCatgories = BigPromise(async (req, res, next) => {
  const allCategories = await Category.find();

  res.status(200).json({
    success: true,
    allCategories,
  });
});

exports.addReview = BigPromise(async (req, res, next) => {
  const { comment, blogId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    walletAddress: req.user.walletAddress,
    comment,
  };

  const blog = await Blog.findById(blogId);
  blog.reviews.push(review);
  blog.numberOfComments = blog.reviews.length;

  await blog.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.addClaps = BigPromise(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  let count = blog.claps + 1;
  const clap = {
    claps: count,
  };
  const AddClaps = await Blog.findByIdAndUpdate(req.params.id, clap, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
