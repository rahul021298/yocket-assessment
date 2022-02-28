/**
 * Require
 */
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

//middlewares
router.route('/upload').post(postController.uploadPost);
router.route('/count').get(postController.getPostByCount);
router.route('/scroll').get(postController.getPostByScroll);

/**
 * Export
 */
module.exports = router;