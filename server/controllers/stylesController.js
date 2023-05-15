const { UserStyles } = require('../models/StyleGPTModels');

const stylesController = {};

stylesController.saveStyle = async (req, res, next) => {
    console.log('running saveStyle');
    // data format 'Mon May 15 2023'
    const date = new Date();
    // get input from req.body;
    const { username, cssStyles, prompt, description } = req.body;
    UserStyles.create( { username, cssStyles, timestamp: date.toString().slice(0,15), prompt, description })
        .then(() => {
            return next();
        })
        .catch(err => {
			return next({
				log: 'Error in stylesController saveStyle method: ' + err,
				status: 400,
				message: {err: 'An error occurred'},
			});
		});
}


module.exports = stylesController;