const cron = require('node-cron')
const sendEmail = require('../email')
const { models: { Item } } = require('../db')

const runCron = () => {
    cron.schedule('* * * * *', async () => {
        const items = await Item.findAll();
        console.log(items)
    });
}

module.exports = runCron