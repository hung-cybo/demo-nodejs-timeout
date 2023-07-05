const { Resolver } = require('node:dns');
const resolver = new Resolver({timeout: 5000});
resolver.setServers(['4.4.4.4']);

// This request will use the server at 4.4.4.4, independent of global settings.
resolver.resolve4('example.org', (err, addresses) => {
  // ...
});
