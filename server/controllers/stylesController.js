const { UserStyles } = require('../models/StyleGPTModels');

const stylesController = {};

stylesController.saveStyle = async (req, res, next) => {
    // console.log('running saveStyle');
    // data format 'Mon May 15 2023'
    const date = new Date();
    // get input from req.body;
    const { prompt } = req.body;
    const cssStyles = res.locals.response;
    UserStyles.create( { cssStyles: cssStyles, timestamp: date.toString().slice(0,15), prompt: prompt })
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

stylesController.getStyles = async (req, res, next) => {
    UserStyles.find({}, 'prompt')
        .then(response => {
            // console.log(response);
            const arr = [];
            for (const obj of response) {
                arr.push(obj["prompt"]);
            }
            // console.log(arr);
            res.locals.styles = arr;
            return next();
        })
        .catch(err => {
            return next({
                log: 'Error in stylesController method: ' + err,
                status: 400,
                message: {err: 'An error occurred'},
            });
        });
}
  


module.exports = stylesController;