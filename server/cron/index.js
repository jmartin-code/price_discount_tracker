const cron = require('node-cron')
const sendEmail = require('../email')
const { models: { Item } } = require('../db');
const scrapper = require('../scraper');

const runCron = () => {
    cron.schedule('* */3 * * *', async () => {
        try {
            console.log('cron running')
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
                }
            }
            ////////// send email if price is lower or equal to target price ///////////////////
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
}

module.exports = runCron

/////////// Experimenting with websocket and socket.io for realtime monitoring //////////////////
    //////////// WS ////////////////////
    // const ws = require('ws')
    // const server = require('../index')
    // const webSocket = new ws.Server({ server })
    // const webSocket = require('../index')
    // let sockets = [];
    // webSocket.on('connection', (socket) => {
        //     sockets.push(socket);
        // socket.on("disconnect", () => {
            //     console.log('disconected')
            // });

            /////// remove disconnected socket ////////
            //     socket.on('close', () => {
                //         task1.stop();
                //         sockets = sockets.filter(s => s !== socket);
                //     });
                // });
                // connected = socket.connected
                // console.log(sockets.length)
                // socket.send(JSON.stringify(item))