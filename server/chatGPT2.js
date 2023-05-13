const axios = require('axios');



const apiKey = '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';
const apiURL = 'https://api.openai.com/v1/completions';

const generateHTMLContent = async () => {
  try {
    const prompt = ` provide styles for this
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>My HTML Content</title>
      </head>
      <body>
        <h1>Hello, World!</h1>
        <p>This is an example of HTML content.</p>
      </body>
      </html>
    `;

    const response = await axios.post(apiURL, {
      prompt,
      max_tokens: 100,
      temperature: 0.7,
      n: 1,
      stop: '\n',
      model: 'text-davinci-003'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

generateHTMLContent();
