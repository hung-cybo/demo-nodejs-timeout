const { WebSocket: IdleTimeout } = require('ws');

const ws = new IdleTimeout('wss://example.com', [], { handshakeTimeout: 5000 });

ws.on('open', () => {
  // WebSocket connection is established
});

ws.on('message', message => {
  // Handle incoming message
});

ws.on('close', () => {
  // WebSocket connection is closed
});