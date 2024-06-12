const mongoose = require('mongoose');

// Define the schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Create the model only if it doesn't already exist
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

module.exports = Blog;
