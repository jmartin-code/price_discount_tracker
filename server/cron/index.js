const cron = require('node-cron')
const sendEmail = require('../email')
const { models: { Item } } = require('../db');
const scrapper = require('../scraper');

const runCron = () => {
    cron.schedule('* * * * *', async () => {
        try {
            console.log('cron started')
            const items = await Item.findAll();
            const updatedItems = [];

            items.forEach(async (item) => {
                // const check = await scrapper(item.link)
                // console.log((item.price * 1), check.itemPrice)
                // console.log((item.price * 1) === (check.itemPrice))
                if ((item.price * 1) !== 10) {
                    console.log('item price changed')
                    await item.update({ price: 10 })
                    updatedItems.push('test')
                }
            })
            console.log(updatedItems.length)

            updatedItems.forEach(async (item) => {
                if (item.targetPrice >= item.price) {
                    console.log('sending automatic email')
                    const priceInfo = 'Item price hit your target price! Time to buy!'
                    const status = 'This is an automatic alert for item:'
                    await sendEmail(item, priceInfo, status)
                }
            })
        }
        catch (error) {
            console.log('something went wrong with cron automation')
        }

    });
}

module.exports = runCron

// let priceInfo;
//         if (item.price < item.targetPrice) {
//             priceInfo = 'Item price hit your target price! Time to buy!'
//         }
//         else {
//             priceInfo = "Item price is above your target price. Let's wait for a better deal!"
//         }
//         const status = 'Your are monitoring a new item:'