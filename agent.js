const http = require("http");

const httpAgent = new http.Agent({ timeout: 2000 });
const req = http.get('http://localhost:3000', { agent: httpAgent, timeout: 0 });

req.on("timeout", () => {
    console.log("expected connection timeout");
    process.exit(1);
});
