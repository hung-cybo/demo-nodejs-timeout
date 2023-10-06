const Axios = require('axios');
const FormData = require('form-data');
const { HttpsProxyAgent } = require('https-proxy-agent');

class SocketTimeoutHttpsAgent extends HttpsProxyAgent {
    createConnection() {
        const socket = super.createConnection();
        socket.setTimeout(180 * 1000, () => { socket.destroy(new Error("timeout error")) });
        return socket;
    }
}

(async () => {
    const socketTimeoutHttpsAgent = new SocketTimeoutHttpsAgent("http://localhost:3128")
    const axios = Axios.create({
        baseURL: 'https://*****.cybozu-dev.com',
        maxBodyLength: Infinity,
        headers: {
            'X-Cybozu-Authorization': '********',
        },
        httpsAgent: socketTimeoutHttpsAgent,
    });

    const data = Buffer.alloc(500 * 1024 * 1024);
    const formData = new FormData();
    formData.append("file", data,' file.txt');

    const startAt = Date.now();
    await axios.post('/k/v1/file.json', formData).then((res) => {
        const endAt = Date.now();
        console.log(`time: ${endAt - startAt}ms`);
    }).catch((err) => {
        console.log(err);
    });
})();