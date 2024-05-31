const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const routes = require('./routes');
app.use('/api', routes);

// Handle 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});