// netlify/functions/api.js

const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const apiKey = process.env.API_KEY; // Retrieve API key from environment variables

  // Use the API key in your API request
  const response = await fetch(`https://api.example.com/data?key=${apiKey}`);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
