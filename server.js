const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const postsFilePath = path.join(__dirname, 'data', 'posts.json');
