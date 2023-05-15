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

authController.createToken = (req, res, next) => {
	const user = { username: req.body.username };
	// sessions are currently set to expire after 1 hour 
	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' });
	// console.log(accessToken);
	// For testing JWTs, do the following:
		// 1. console.log(accessToken)
		// 2. copy the accessToken from the console and paste it into the Authorization header in Postman in the following format:
			// BEARER accessToken
			// Ex: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkphbWVzMSIsImlhdCI6MTY4NDExMDcyMCwiZXhwIjoxNjg0MTEwNzgwfQ.2PldxW9dOOCuXSTmvJcfbNGsfWZyIG441b_c7mnzDto
		// 3. after updating the authorization header in Postman, test a route that uses the authenticateToken method 
			// Ex: run a GET request to '/testJWT'
		// 4. there should be a successful status code (you should see 'Access Granted' when running the '/testJWT' test)
		// 5. if you update the expiration date when the accessToken is created (the expiresIn field where jwt.sign is invoked), 
			//  and then you run these tests, you should get 'Access Granted' until the accessToken expires. 
			//  You'll get 'Access Denied' after the accessToken expires. 
			//  You'll also get 'Access Denied' if you change a single character in the accessToken (in the authorization header). 
	return next();
}

authController.authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) res.status(401).send('Access Denied');
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).send('Access Denied');
		req.user = user;
		return next();
	});
}

module.exports = authController;