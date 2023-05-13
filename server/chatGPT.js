const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const html = `
      <body>
      <h1 class="my-title">Generic Element</h1>
      <h2 class="my-subtitle">This is subtitle</h2>
      <p class="my-paragraph">This is an example of HTML content.</p>
      <div class="my-div">Here's a div with stuff in it.<div>
      </body>
`;

const htmlString = html.replace(/\n/g, '').replace(/\s+/g, ' ').trim();

const prompt = `generate CSS rules for each element of this this html to make it look festive ${htmlString}`;

console.log(prompt);

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);
  
async function runCompletion () {
    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens:4000,
    // temperature set to zero to keep responses consistent
    temperature:0
    });
    console.log('response from chatGPT', completion.data.choices[0].text);
}
runCompletion();