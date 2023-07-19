const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

function encodeHTMLEntities(rawStr) {
  return rawStr.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
}

const getHtmlString = (file = 'sample_component.html') => {
  const templateHtml = fs
    .readFileSync(
      path.join(
        path.resolve(__dirname, '../client/components/iframe_assets/'),
        file
      )
    )
    .toString();

  return encodeHTMLEntities(templateHtml);
};

<<<<<<< HEAD
// prompt interpolates the input and is passed into runCompletion
//const prompt = `generate CSS rules for each element of this html ${descriptor} ${htmlString}`;

// temporary variable to hold open AI key while we figure how to get the the prompt in runcompletion
// const key = process.env.OPENAI_API_KEY;

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
            temperature:0.8
        });
    console.log('response from chatGPT', completion.data.choices[0].text);
    return completion.data.choices[0].text;
=======
async function runCompletion(descriptor, key, temp, model) {
  // configuration is where private key is set up
  const htmlString = getHtmlString();

  const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: key
  });
  // OpenAIApi constructor takes in the configuration object.
  const openai = new OpenAIApi(configuration);

  if (model === 'text-davinci-003') {
    const completion = await openai.createCompletion({
      model: model,
      prompt: `generate CSS rules for each element of this html to look ${descriptor} ${htmlString}`,
      max_tokens: 3500,
      // temperature set to zero to keep responses consistent
      temperature: Number(temp)
    });

    console.log('response from chatGPT', completion.data.choices[0].text);

    return completion.data.choices[0].text;
  } else if (model.includes('gpt-3.5-turbo')) {
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

    let resultText = completion.data.choices[0].message.content;
    if (resultText.includes('```')) {
      resultText = resultText.split('```')[1].trim();
      if (resultText.split('\n')[0].search(/css|CSS/)) {
        resultText = resultText.split('\n').slice(1).join('\n');
      }
      return resultText;
    }
    return encodeHTMLEntities(resultText);
  }
>>>>>>> 956876ef9d63c14d09bd3bc15991f40701f07113
}


module.exports = runCompletion;
