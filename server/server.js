const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const postRoutes = require('./routes/posts')
server.use('/posts', postRoutes)

const port = process.env.PORT || 3000;

// Root route
server.get('/', (req, res) => res.send('Hello, client!'))

server.listen(port, () => console.log(`Express now departing from http://localhost:${port}!`))