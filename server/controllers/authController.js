const bcrypt = require('bcrypt');
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
			res.locals.message = 'logged in';
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

module.exports = authController;