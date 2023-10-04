const axios = require('axios');
// import {AxiosError} from 'axios';

(async function getPosts() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
      {
        headers: {
          Accept: 'application/json',
        },
          clarifyTimeoutError: true,
        timeout: 1,
      }
    );

    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
})();
