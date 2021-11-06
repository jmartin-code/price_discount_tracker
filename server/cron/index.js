const cron = require('node-cron')
const sendEmail = require('../email')
const { models: { Item } } = require('../db');
const scrapper = require('../scraper');

//////////// WS ////////////////////
// const ws = require('ws')
// const server = require('../index')
// const webSocket = new ws.Server({ server })
// const webSocket = require('../index')
// let sockets = [];


const runCron = () => {
    // webSocket.on('connection', (socket) => {
    //     sockets.push(socket);
    cron.schedule('* * * * *', async () => {
        try {
            console.log('cron running')
            // connected = socket.connected
            // console.log(sockets.length)
            const items = await Item.findAll() || [];
            const updatedItems = []

            //////////// Check for price updates and update the item price /////////////
            for (let i = 0; i < items.length; i++) {
                const item = items[i]
                const scrapeItem = await scrapper(item.link)

                if ((item.price * 1) !== scrapeItem.itemPrice * 1) {
                    console.log('item price changed')
                    await item.update({ price: scrapeItem.itemPrice })
                    updatedItems.push(item)
                    // socket.send(JSON.stringify(item))
                }
            }

            ///////// If there is updatedItems, updated the redux store //////////
            // console.log('Run automatic')

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
            console.log(error)
            console.log('something went wrong with cron automation')
        }
    });

    // socket.on("disconnect", () => {
    //     console.log('disconected')
    // });

    /////// remove disconnected socket ////////
    //     socket.on('close', () => {
    //         task1.stop();
    //         sockets = sockets.filter(s => s !== socket);
    //     });
    // });

}

module.exports = runCron