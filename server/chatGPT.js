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

  console.log(templateHtml);
  return encodeHTMLEntities(templateHtml);
};

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
      max_tokens: 4000,
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

    const resultText = completion.data.choices[0].message.content;
    if (resultText.includes('```')) {
      return resultText.split('```')[1].trim();
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
