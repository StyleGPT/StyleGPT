const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

// html is a string that's formatted html.
const html = `
      <body>
      <h1 class="my-title">Generic Element</h1>
      <h2 class="my-subtitle">This is a subtitle</h2>
      <p class="my-paragraph">This is a paragraph.</p>
      <div class="my-div">Here's a div with stuff in it.<div>
      </body>
`;

// htmlString removes newline and reduces all spaces by capturing one or more spaces and replacing them with one.
const htmlString = html.replace(/\n/g, '').replace(/\s+/g, ' ').trim();

// descriptor will be the text string that's passed in and will change the query
// const descriptor = 'to look like cheese';

// prompt interpolates the input and is passed into runCompletion
//const prompt = `generate CSS rules for each element of this html ${descriptor} ${htmlString}`;

// make a larger function that includes runcompletion and configuration

// temporary variable to hold open AI key while we figure how to get the the prompt in runcompletion
const key = process.env.OPENAI_API_KEY;

// runCompletion calls the API with the necessary inputs
    // descriptor is the input from the user, taken from req.body.prompt
async function runCompletion(descriptor, key) {
    // configuration is where private key is set up
    const configuration = new Configuration({
        // apiKey: process.env.OPENAI_API_KEY,
        apiKey: key
      });
    // OpenAIApi constructor takes in the configuration object.
    const openai = new OpenAIApi(configuration);
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `generate CSS rules for each element of this html ${descriptor} ${htmlString}`,
            max_tokens:4000,
            // temperature set to zero to keep responses consistent
            temperature:0
        });
    console.log('response from chatGPT', completion.data.choices[0].text);
    return completion.data.choices[0].text;
}

// returns the response from the API
// const cssResponse = runCompletion(descriptor, key);
// console.log(cssResponse);

// make response - main export, holds the configuration, takes in everything passed in from the controller, prompt and the API key
    // define the prompt
    // define configuration and API piece
    // use whatever key is passed in.
// html string could stay outside of it for now


module.exports = runCompletion;