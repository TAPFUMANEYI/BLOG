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

// Add a new post
app.post('/api/posts', (req, res) => {
    const posts = readPosts();
    const newPost = {
        id: posts.length ? posts[posts.length - 1].id + 1 : 1,
        title: req.body.title,
        content: req.body.content,
        comments: []
    };
    posts.push(newPost);
    writePosts(posts);
    res.status(201).json(newPost);
});


// Deleting a post by ID
app.delete('/api/posts/:id', (req, res) => {
    let posts = readPosts();
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    writePosts(posts);
    res.status(204).send();
});

// Add a comment to a post
app.post('/api/posts/:id/comments', (req, res) => {
    const posts = readPosts();
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        const newComment = {
            id: post.comments.length ? post.comments[post.comments.length - 1].id + 1 : 1,
            text: req.body.text
        };
        post.comments.push(newComment);
        writePosts(posts);
        res.status(201).json(newComment);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});