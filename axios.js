const axios = require('axios');

(async function getPosts() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
      {
        headers: {
          Accept: 'application/json',
        },
        timeout: 1,
      }
    );

    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
})();
