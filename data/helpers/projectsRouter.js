const express = require('express');

const projects = require('./projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    projects.find(req.query)
        .then(posts => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({
                message: "The projects could not be retrieved"
            });
        });
});

module.exports = router;

