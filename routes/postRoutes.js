const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { getAllPosts, createPost, editPost, deletePost, getCreatePost, getEditPost, getPost } = require('../controllers/postControllers');

const router = express.Router();
router.route('/posts').get(isLoggedIn, getAllPosts);
router.route('/posts/new').post(isLoggedIn, createPost);
router.route('/posts/new').get(isLoggedIn, getCreatePost);
router.route('/posts/:id').get(isLoggedIn, getPost);
router.route('/posts/:id/edit').get(isLoggedIn, getEditPost);
router.route('/posts/:id/edit').patch(isLoggedIn, editPost);
router.route('/posts/:id/delete').delete(isLoggedIn, deletePost);
module.exports = router;