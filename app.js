const {invokeScript} = require('@waves/waves-transactions');
const schedule = require("node-schedule");
const {broadcast, getBalance} = require("./api");

const seed = process.env.SEED;
const beneficiary = process.env.BENEFICIARY;
const miner = process.env.MINER;
const invokeFee = 500000;

const mkInvoke = (balance) => {
    return invokeScript({
        dApp: '3P9vKqQKjUdmpXAfiWau8krREYAY1Xr69pE',
        sender: miner,
        call: {
            function: 'distributeMinerReward',
            args: [{"type": "string", "value": beneficiary}]
        },
        payment: [{assetId: null, amount: balance.regular - invokeFee}]
    }, seed);
};

const main = async () => {
    schedule.scheduleJob("0 */8 * * *", async () => {
        const r = await getBalance(miner);
        const balance = JSON.parse(r.body);

        if (balance.regular > invokeFee) {
            const tx = mkInvoke(balance);
            const r = await broadcast(tx);
            console.log(`Broadcast invoke tx: ${tx.id} | code ${r.code}`);
        } else {
            console.log(`Not enough balance: ${JSON.stringify(balance)}`);
        }
    });
}

main();
