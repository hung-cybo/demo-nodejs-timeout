const fs = require('fs');

function readFileWithTimeout(filePath, timeout) {
  let timeoutId;

  const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

  // Set up a timeout to abort the read operation if it exceeds the specified timeout duration
  function setupTimeout() {
    timeoutId = setTimeout(() => {
      readStream.destroy(new Error('Read operation timed out'));
    }, timeout);
  }

  readStream.on('data', data => {
    // Handle data read
    clearTimeout(timeoutId); // Reset the timeout on data arrival
    setupTimeout(); // Set up the timeout again for the next chunk
  });

  readStream.on('error', error => {
    // Handle error
    clearTimeout(timeoutId); // Clear the timeout if an error occurs
  });

  readStream.on('end', () => {
    // Read operation completed successfully
    clearTimeout(timeoutId); // Clear the timeout on successful completion
  });

  setupTimeout(); // Start the initial timeout

  return readStream;
}

// Example usage:
const filePath = 'input.txt';
const readTimeout = 30000; // 30 seconds

const readStream = readFileWithTimeout(filePath, readTimeout);

readStream.on('data', data => {
  console.log('Data:', data);
});

readStream.on('error', error => {
  console.error('Error:', error.message);
});

readStream.on('end', () => {
  console.log('Read operation completed successfully.');
});
