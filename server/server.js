require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// import controllers
const chatgptController = require('./controllers/chatgptController');
const authController = require('./controllers/authController');
const stylesController = require('./controllers/stylesController');

app.use(express.json());

// app.get('/pita', authController.authenticateToken, (req, res) => res.status(200).send('Access Granted'));

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
  });
  app.use('/', express.static(path.join(__dirname, '../dist')));
} else {
  app.use('/', express.static(path.join(__dirname, '../client')));
  app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
  });
}

// route to handle get requests to '/chatgpt' endpoint
app.post('/chatgpt', chatgptController.query, stylesController.saveStyle, (req, res) => 
res.status(200).send(res.locals.response));

// route to handle post requests to '/signup' endpoint (user signups)
app.post('/signup', authController.signup, authController.createToken, (req, res) => res.send(res.locals.message));

// route to handle post requests to '/login' endpoint (user logins)
app.post('/login', authController.login, authController.createToken, (req, res) => res.send(res.locals.message));

// route to handle get requests to userStyles database
app.get('/userstyles', stylesController.getStyles, (req, res) => res.send(res.locals.styles));

// route to test authentication 
// app.get('/testJWT', authController.authenticateToken, (req, res) => res.status(200).send('Access Granted'));

// route to add a document to userStyles database
// app.post('/saveStyle', stylesController.saveStyle, (req, res) => res.status(201).send('Document added to database'));

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
