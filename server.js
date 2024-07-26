const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const postsFilePath = path.join(__dirname, 'data', 'posts.json');

// Helper function to read posts from file
const readPosts = () => {
    const postsData = fs.readFileSync(postsFilePath);
    return JSON.parse(postsData);
};

// so here is a function to read posts from file
const readPosts = () => {
    const postsData = fs.readFileSync(postsFilePath);
    return JSON.parse(postsData);
};

// Helper function to write posts to file
const writePosts = (posts) => {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
};

// Get all posts
app.get('/api/posts', (req, res) => {
    const posts = readPosts();
    res.json(posts);
});

// Get a single post by ID
app.get('/api/posts/:id', (req, res) => {
    const posts = readPosts();
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});