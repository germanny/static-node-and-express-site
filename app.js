const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

// require the general routes
const appRoutes = require('./routes/index');
app.use(appRoutes);

// require the project page routes
const projectRoutes = require('./routes/projects');
app.use('/projects', projectRoutes);

/* ERRORS */
app.use((req, res, next) => {
  // create a general 404 error
  const err = new Error('Sorry, page not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  // handle other errors
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// turn on the app
const port = process.env.PORT || 3000;

app.listen(port, () => {
  if (port === 3000) {
    console.log('We\'re running on localhost:3000!')
  }
});
