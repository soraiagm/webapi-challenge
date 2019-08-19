const express = require('express');

const projectsRouter = require('./data/helpers/projectsRouter.js');

const server = express();

server.use(express.json());
server.use('./api/projects', projectsRouter);

// //REQUEST HANDLER//

server.get('/', (req, res) => {
    console.log(req.body);
    res.send(`<h2>Lambda API Sprint Challenge</h2>`);
});

module.exports = server;