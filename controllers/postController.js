const axios = require('axios');
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/data.json');

exports.getPosts = (req, res) => {
    fs.readFile(dataFilePath, (err, data) => {
        if (err) return res.status(500).send('Error reading posts data');
        res.json(JSON.parse(data));
    });
};

exports.getPostById = (req, res) => {
    const postId = parseInt(req.params.postId);
    fs.readFile(dataFilePath, (err, data) => {
        if (err) return res.status(500).send('Error reading post data');
        const posts = JSON.parse(data);
        const post = posts.find(p => p.id === postId);
        if (!post) return res.status(404).send('Post not found');
        res.json(post);
    });
};

exports.createPosts = async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data.slice(0, 10);
        fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2), (err) => {
            if (err) return res.status(500).send('Error writing posts data');
            res.status(201).send('Posts created successfully');
        });
    } catch (error) {
        res.status(500).send('Error creating posts');
    }
};