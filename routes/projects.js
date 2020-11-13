const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

router.get('/projects/:id', (req, res, next) => {
  const projectID = req.params.id;

  if (!projectID) {
    return res.redirect('/');
  }

  const project = projects.find(({ id }) => id === +projectID);
  if (project) {
    res.render('project', { project });
  } else {
    const err = new Error();
    err.message = "Sorry, this project does not exist. :(";
    err.status = 400;
    next(err);
  }
});

module.exports = router;
