const axios = require('axios');
const http = require("http");
const https = require("https");

axios
    .get('http://localhost:3000', { timeout: 5000 })
    .then((res) => console.log('Done'))
    .catch((error) => {
        if (error.code === 'ECONNABORTED') {
            console.log('Request timed out');
        } else {
            console.error('Error:', error.message);
        }
    });


// axios.defaults.timeout = 10000;
// axios.defaults.httpAgent = new http.Agent({ timeout: 500 })
// axios.defaults.httpsAgent = new https.Agent({ timeout: 500 })
//
// axios.get("https://www.google.com:81")
//     .catch(console.log) // display 'timeout of 3000ms exceeded' but timeout after 500ms

// axios.defaults.timeout = 10000;
// axios.get("https://www.google.com:81", {
//     httpAgent: new http.Agent({ timeout: 2000 }),
//     httpsAgent: new https.Agent({ timeout: 2000 }),
// }).catch((e)=>{console.log(e.toString())});