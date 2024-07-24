const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to the  KIM Blog Platform!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});