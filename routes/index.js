const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const fileController = require('../controllers/fileController');

// User routes
router.get('/users', userController.getUsers);
router.get('/users/:id/posts', userController.getUserPosts);

// Post routes
router.get('/posts', postController.getPosts);
router.get('/posts/:postId', postController.getPostById);
router.post('/posts', postController.createPosts);

// File routes
router.post('/files', fileController.uploadFile);

module.exports = router;