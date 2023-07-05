const axios = require('axios');
const https = require('https');
const { HttpsProxyAgent } = require('https-proxy-agent');

const instance = axios.create({
  httpsAgent: new https.Agent({
    timeout: 5000, // Set the connection timeout
  }),
});

const url = 'https://tasshi.dev';
// const url = 'https://cli-kintone-qa.kintone-dev.com';
const requestTimeout = 10000;

const options = {
  method: 'GET',
  url: url,
  timeout: requestTimeout, // Set the request timeout
};

instance
  .request(options)
  .then((response) => {
    console.log('Response:', response.data);
  })
  .catch((error) => {
    if (error.code === 'ECONNABORTED') {
      console.log('Request timed out');
    } else {
      console.error('Error:', error.message);
    }
  });
