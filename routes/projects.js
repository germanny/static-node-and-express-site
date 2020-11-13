const express = require('express');
const router = express.Router();

// get the projects object from data.json
const { projects } = require('../data.json');

/* GET projects page */
router.get('/', (req, res, next) => {
  // render the homepage template
  res.render('index', { projects });
});

/* GET individual project pages */
router.get('/:id', (req, res, next) => {
  // get the project id from the url
  const projectID = req.params.id;

  // if there's no id in the url, redirect to the projects page
  if (!projectID) {
    return res.redirect('/');
  }

  // look for the id in the projects object in data.json
  const project = projects.find(({ id }) => id === +projectID);

  // if the project exists
  if (project) {
    // render the project template and passing in the project object
    res.render('project', { project });
  } else {
    // otherwise, pass in error
    const err = new Error();
    err.message = "Sorry, this project does not exist. :(";
    err.status = 400;
    next(err);
  }
});

// export the module
module.exports = router;
