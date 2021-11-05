const cron = require('node-cron')
const sendEmail = require('../email')
const { models: { Item } } = require('../db');
const scrapper = require('../scraper');

const runCron = () => {
    cron.schedule('8 * * * * *', async () => {
        try {
            console.log('cron started')
            const items = await Item.findAll() || [];
            const updatedItems = []

            //////////// Check for price updates and update the item price /////////////
            for (let i = 0; i < items.length; i++) {
                const item = items[i]
                const scrapeItem = await scrapper(item.link)

                if ((item.price * 1) !== scrapeItem.itemPrice) {
                    console.log('item price changed')
                    await item.update({ price: scrapeItem.itemPrice })
                    updatedItems.push(item)
                }
            }

            ///////// If there is updatedItems, updated the redux store //////////
            

            ////////// If the price is lower than target price, send eamil to user /////
            for (let i = 0; i < updatedItems.length; i++) {
                const item = updatedItems[i]

                if (item.targetPrice >= item.price) {
                    console.log('sending automatic email')
                    const priceInfo = 'Item price hit your target price! Time to buy!'
                    const status = 'This is an automatic alert for item:'
                    await sendEmail(item, priceInfo, status)
                }
            }
        }
        catch (error) {
            console.log('something went wrong with cron automation')
        }

    });
}

module.exports = runCron