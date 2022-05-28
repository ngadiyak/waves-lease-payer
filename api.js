const unirest = require("unirest");


const nodeUrl = 'https://nodes.wavesexplorer.com'

const get = (url) => {
    return new Promise((resolve, reject) => {
        unirest.get(url).end((response) => {
            resolve({code: response.code, body: response.raw_body});
            reject(new Error({code: response.code, body: response.raw_body}));
        });
    });
}

const post = (url, headers, body) => {
    return new Promise((resolve, reject) => {
        unirest.post(url).headers(headers).send(body).end((response) => {
            resolve({code: response.code, body: response.raw_body});
            reject(new Error({code: response.code, body: response.raw_body}));
        });
    });
}

module.exports = {
    getBalance: async (address) => {
        return await get(`${nodeUrl}/addresses/balance/details/${address}`);
    },

    broadcast: async (tx) => {
        return await post(`${nodeUrl}/transactions/broadcast`, {'accept': 'application/json', 'Content-Type': 'application/json'}, JSON.stringify(tx))
    }
}