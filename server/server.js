const bcrypt = require('bcrypt');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// import chatgptController methods
const chatgptController = require('./controllers/chatgptController');

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
//app.get('/chatgpt', chatgptController.query, (req, res) => res.sendStatus(200));

// Users array is a test database for storing users - we'll want to replace this with a MongoDB database
const users = [
  {
    username: 'username',
    password: 'password',
  }
]

// route to handle post requests to '/signup' endpoint (user signups)
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  users.push({
    username,
    password: hash,
  })
  console.log(`username: ${username}`);
  console.log(`password: ${password}`);
  console.log(`hash: ${hash}`);
  console.log(`users: ${users}`);
  res.send('user created');
})


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
