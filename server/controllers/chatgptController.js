const runCompletion = require('../chatGPT');
console.log('in run completion', runCompletion)

const key = process.env.OPENAI_API_KEY;

const chatgptController = {};

chatgptController.query = async (req, res, next) => {
    // insert call to OpenAI API and store result on res.locals
    // Where/how does the prompt for the chatGPT API get pulled in?
    // cssResponse invokes the runCompletion method on chatGPT
    // req.body.prompt, req.body.key will be in there also
    console.log('running chatGPTConroller');
    res.locals.response = await runCompletion(req.body.prompt, key);
    next();
}

module.exports = chatgptController;