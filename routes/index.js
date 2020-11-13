const express = require('express');
const router = express.Router();

// get the projects object from data.json
const { projects } = require('../data.json');

/* GET homepage */
router.get('/', (req, res, next) => {
  // render the homepage and pass in the whole projects module
  res.render('index', { projects });
});

/* GET about page */
router.get('/about', (req, res) => {
  // render the about page
  res.render('about');
});

// export the module
module.exports = router;
