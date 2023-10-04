const axios = require('axios');
const https = require('https');
const httpsProxyAgent = require('https-proxy-agent');

// const instance = axios.create({
//   httpsAgent: new https.Agent({
//     timeout: 5000, // Set the connection timeout
//     // keepAlive: true,
//   }),
// });
//
// // const url = 'https://tasshi.dev';
// const url = 'http://localhost:3000';
// // const url = 'https://cli-kintone-qa.kintone-dev.com';
// const requestTimeout = 10000;
//
// const options = {
//   method: 'GET',
//   url: url,
//   // timeout: requestTimeout, // Set the request timeout
// };
//
// instance
//   .request(options)
//   .then((response) => {
//     console.log('Response:', response.data);
//   })
//   .catch((error) => {
//     if (error.code === 'ECONNABORTED') {
//       console.log('Request timed out');
//     } else {
//       console.error('Error:', error.message);
//     }
//   });


class SocketTimeoutHttpsAgent extends https.Agent {
  createConnection(options, callback) {
    const socket = super.createConnection(options);
    console.log(`settimeout: ${options}`);
    socket.on("timeout", () => { socket.destroy(new Error("timeout")) });
    return socket;
  }
}

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  maxBodyLength: Infinity,
  httpsAgent: new SocketTimeoutHttpsAgent({ timeout: 10000 }),
  // timeout: 2100
});

const url = 'http://localhost:3000';
const options = {
  method: 'GET',
  url: url,
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