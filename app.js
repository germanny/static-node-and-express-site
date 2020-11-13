const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

const appRoutes = require('./routes/index');
app.use(appRoutes);

const projectRoutes = require('./routes/projects');
app.use(projectRoutes);

app.use((req, res, next) => {
  const err = new Error('Sorry, page not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('We\'re running on localhost:3000!')
});
