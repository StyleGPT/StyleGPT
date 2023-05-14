const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models/StyleGPTModels');

const authController = {};

authController.signup = async (req, res, next) => {
	const { username, password, apikey } = req.body;
	const hash = await bcrypt.hash(password, 10);
	Users.create({username: username, password: hash, apikey: apikey})
		.then(() => {
			res.locals.message = 'user created in database';
			return next();
		})
		.catch(err => {
			if (err.code === 11000) {
				res.locals.message = 'username is already taken';
				return next();
			}
			return next({
				log: 'Error in authController signup method: ' + err,
				status: 400,
				message: {err: 'An error occurred'},
			});
		});
};

authController.login = (req, res, next) => {
  const { username, password } = req.body;
  const user = Users.find({ username: username }, 'username password')
    .then(async user => {
      // if the user does not exist in the database
      if (!user[0]) {
				res.locals.message = 'login failed';
				return next();
      }
      const authorized = await bcrypt.compare(password, user[0].password);
      // if the password is incorrect
      if (!authorized) {
				res.locals.message = 'login failed';
				return next();
      }
      // here we'll want to send a JWT and create a session
			res.locals.message = 'authenticated';
			return next();
    })
    .catch(err => {
			return next({
				log: 'Error in authController login method: ' + err,
				status: 400,
				message: {err: 'An error occurred'},
			});
		});
};

authController.createToken = (req, res, next) => {
	const user = { username: req.body.username };
	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
	const token = { accessToken: accessToken };
	res.locals.user = user;
	res.locals.token = token;
	return next();
}

authController.authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	// not sure if I can send status from here
	if (!token) res.sendStatus(401);
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, res.locals.user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}

module.exports = authController;