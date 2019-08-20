const express = require('express');
const projects = require('./projectModel.js');
const router = express.Router();


// get projects
router.get('/', (req, res) => {
    projects.get(req.query)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({
                message: "The projects could not be retrieved"
            });
        });
});

// get project by id
router.get('/:id', (req, res) => {
    projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({
                    message: "The project with the specified ID does not exist."
                });
            }
        })
        .catch(() => {
            res.status(500).json({
                error: "The project information could not be retrieved."
            });
        });
});

// post a project
router.post('/', (req, res) => {
    const { name, description } = req.body;

        if (!name || !description ) {
            res.status(400).json({
                errorMessage: "Please provide name and description for the project."
            });
        } else {
            projects.insert(req.body)
                .then(project => {
                    res.status(201).status(project);
                })
                .catch(err => {
                    res.status(500).json({
                        error: "There was an error saving the project to the database"
                    });
                });
        }
});

// update a project
router.put('/:id', (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;

    projects.update(id, { name, description })
        .then(isUpdated => {
            if(!isUpdated) {
                res.status(400).json({
                    message: `The post with id ${id} could not be updated`
                })
            } else {
                res.status(200).json(isUpdated)
            }
        })
        .catch(() => {
            res.status(500).json({
                error: "The project information could not be modified"
            });
        });
});

// delete a project
// router.delete('/:id', (req, res) => {
//     projects.remove(req.params.id)
//         .then(count => {
//             if(count && count > 0) {
//                 res.status(200).json({
//                     message: "The project was deleted"
//                 });
//             } else 
//         })
//         .catch()
// })


module.exports = router;

