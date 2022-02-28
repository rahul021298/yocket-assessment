/**
 * Require
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Defining schema for a post
 */
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

/**
 * Creating model for defined schema
 */
const Post = mongoose.model('Post', postSchema);

/**
 * Export
 */
module.exports = Post;