const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

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
//const key = process.env.OPENAI_API_KEY;

// runCompletion calls the API with the necessary inputs
// descriptor is the input from the user, taken from req.body.prompt
async function runCompletion(descriptor, key, temp, model) {
  // configuration is where private key is set up

  console.log(descriptor, key, temp, model);
  const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: key
  });
  // OpenAIApi constructor takes in the configuration object.
  const openai = new OpenAIApi(configuration);

  if (model === 'text-davinci-003' || model === 'code-davinci-002') {
    const completion = await openai.createCompletion({
      model: model,
      prompt: `generate CSS rules for each element of this html to look ${descriptor} ${htmlString}`,
      max_tokens: 4000,
      // temperature set to zero to keep responses consistent
      temperature: Number(temp)
    });

    console.log('response from chatGPT', completion.data.choices[0].text);

    return completion.data.choices[0].text;
  } else if (model === 'gpt-3.5-turbo') {
    const completion = await openai.createChatCompletion({
      model: model,
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that creates CSS styling rules when provided with HTML code.'
        },
        {
          role: 'user',
          content: `generate CSS rules for each element of this html to look ${descriptor} ${htmlString}`
        }
      ],
      // temperature set to zero to keep responses consistent
      temperature: Number(temp)
    });
    console.log(completion);

    const resultText = completion.data.choices[0].message.content;
    if (resultText.includes('```')) {
      return resultText.split('```')[1];
    }
    return resultText;
  }
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
