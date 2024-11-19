// const express = require('express');
// const cors = require('cors');

// // Initialize app and middleware
// const app = express();
// app.use(cors());
// app.use(express.json()); // Parses incoming JSON requests

// // In-memory data storage
// let users = [];
// let userId = 1;

// // Get all users
// app.get('/api/users', (req, res) => {
//     res.json(users);
// });

// // Add a new user
// app.post('/api/users', (req, res) => {
//     const newUser = { id: userId++, ...req.body };
//     users.push(newUser);
//     res.status(201).json(newUser);
// });

// // Update a user by ID
// app.put('/api/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const index = users.findIndex(user => user.id === id);
//     if (index === -1) {
//         return res.status(404).send({ error: 'User not found' });
//     }
//     users[index] = { id, ...req.body };
//     res.json(users[index]);
// });

// // Delete a user by ID
// app.delete('/api/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     users = users.filter(user => user.id !== id);
//     res.status(204).send(); // No content
// });

// // Start the server
// const PORT = 4000;
// app.listen(PORT, () => console.log(Server running at http://localhost:${PORT}));



const express = require('express');
const cors = require('cors');

// Initialize app and middleware
const app = express();
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// In-memory data storage
let users = [];
let userId = 1;

// Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Add a new user
app.post('/api/users', (req, res) => {
    const newUser = { id: userId++, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user by ID
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return res.status(404).send({ error: 'User not found' });
    }
    users[index] = { id, ...req.body };
    res.json(users[index]);
});

// Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.status(204).send(); // No content
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
