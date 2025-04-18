const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// erve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// routes
const jokeRoutes = require('./routes/jokeRoutes');
app.use('/jokebook', jokeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
