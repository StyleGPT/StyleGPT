const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

console.log(process.env.OPENAI_API_KEY);

const prompt = JSON.stringify(`give me CSS styles that will style a div with unicorn colors`);

console.log(prompt);

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);
  
  async function runCompletion () {
    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens:4000
    });
    console.log(completion.data.choices[0].text);
}
runCompletion();