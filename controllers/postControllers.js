const { postSchema } = require("../helpers/validationSchemas");
const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const result = await postSchema.validateAsync(req.body);
    const { title, content, comments, tag } = req.body;
    if (!title || !content || !comments)
      throw new Error("Incomplete Data");
    const post = await Post.create({
      title,
      content,
      comments,
      tag
    });
    if (!post) throw new Error("Database Error!");
    else {
      res.redirect("/posts");
    }
  } catch (error) {
    res.status(422).send({
      message: error.message,
    });
  };
  
};

const getCreatePost = async (req, res) => {
  res.render("posts/new");
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render("posts/index", { posts });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;

  const { title, content, comments, tag } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      {
        _id: id,
      },
      { title, content, comments, tag }
    );
    res.redirect("/posts");
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const getEditPost = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Post Id not provided");
  try {
    const post = await Post.findById({ _id: id });
    // console.log(shirt);
    res.render("posts/edit", { post });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete({ _id: id });
    res.redirect("/posts");
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const getPost = async (req, res) => {
  const _id = req.params.id;
  if (!_id) {
    throw new Error("Id not provided");
    process.exit(0);
  }
  try {
    const post = await Post.findById({ _id });
    if (!post) {
      res.status(501).send({
        message: "Requested Resource not found",
      });
      process.exit(0);
    } else {
      res.render("posts/single_post", { post });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


module.exports = {
  createPost,
  getAllPosts,
  editPost,
  deletePost,
  getCreatePost,
  getEditPost,
  getPost,
};
