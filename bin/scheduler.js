const sendEmail = require('../server/email');
const { models: { Item } } = require('../server/db');
const scrapper = require('../server/scraper');

const runHerokuSchedule = async () => {
    // cron.schedule('00 */6 * * *', async () => {
    try {
        console.log('Heroku Scheduler Running')
        const items = await Item.findAll() || [];
        const updatedItems = []

        //////////// Check for price updates and update the item price /////////////
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const scrapeItem = await scrapper(item.link)

            if ((item.price * 1) !== (scrapeItem.itemPrice * 1)) {
                console.log('item price changed')
                await item.update({ price: scrapeItem.itemPrice })
                updatedItems.push(item)
            }
        }
        ////////// send email if price is lower or equal to target price ///////////////////
        for (let i = 0; i < updatedItems.length; i++) {
            const item = updatedItems[i]

            if ((item.targetPrice * 1) >= (item.price * 1)) {
                console.log('sending automatic email')
                const priceInfo = 'Item price hit your target price! Time to buy!'
                const status = 'This is an automatic alert for item:'
                await sendEmail(item, priceInfo, status)
            }
        }
    }
    catch (error) {
        console.log(error)
        console.log('something went wrong with cron automation')
    }
    // });
}

runHerokuSchedule();