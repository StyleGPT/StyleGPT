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
const descriptor = 'to look like cheese';

// prompt interpolates the input and is passed into runCompletion
const prompt = `generate CSS rules for each element of this html ${descriptor} ${htmlString}`;

console.log(prompt);

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);
  
async function runCompletion(input) {
    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: input,
    max_tokens:4000,
    // temperature set to zero to keep responses consistent
    temperature:0
    });
    console.log('response from chatGPT', completion.data.choices[0].text);
}

const cssResponse = runCompletion(prompt);
console.log(cssResponse);

