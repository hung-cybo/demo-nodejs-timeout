const http = require('http');

// Create a server that delays accepting connections
const server = http.createServer((req, res) => {
    // Simulate a delay of 10 seconds before responding to any request
    // setTimeout(() => {
    //     res.writeHead(200, { 'Content-Type': 'text/plain' });
    //     res.end('Hello, World!');
    // }, 10000); // Delay of 10 seconds


    // sending data every 2 seconds while keeping the connection open for 30 seconds
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Set an interval to send data every 2 seconds
    const intervalId = setInterval(() => {
        res.write('Data sent every 2 seconds\n');
    }, 2000);

    // Close the connection after 30 seconds
    setTimeout(() => {
        clearInterval(intervalId);
        res.end('Connection closed after 10 seconds');
    }, 10000);
});

// Listen on a specific port
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
