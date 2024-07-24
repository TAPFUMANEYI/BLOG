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