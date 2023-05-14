require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


const app = express();
const PORT = 3000;

// import chatgptController methods
const chatgptController = require('./controllers/chatgptController');
const { Users } = require('./models/StyleGPTModels');

app.use(express.json());

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
// app.post('/chatgpt', chatgptController.query, (req, res) => res.sendStatus(200));

// route to handle post requests to '/signup' endpoint (user signups)
app.post('/signup', async (req, res) => {
  const { username, password, apikey } = req.body;
  const hash = await bcrypt.hash(password, 10);
  Users.create({username: username, password: hash, apikey: apikey})
    .then(() => {
      return res.send('user created in database')
    })
    .catch(err => {
      console.log(err);
      if (err.code === 11000) {
        return res.send('Username is already taken');
      }
    });
})

//route to handle post requests to '/login' endpoint (user logins)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = Users.find({ username: username }, 'username password')
    .then(async user => {
      // if the user does not exist in the database
      if (!user[0]) {
        return res.send('login failed');
      }
      const authorized = await bcrypt.compare(password, user[0].password);
      // if the password is incorrect
      if (!authorized) {
        return res.send('login failed');
      }
      // here we'll want to send a JWT and create a session
      return res.send('logged in');
    })
    .catch(err => console.log(err));
});

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
