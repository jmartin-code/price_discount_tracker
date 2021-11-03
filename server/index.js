const { db, syncAndSeed } = require('./db')
const PORT = process.env.PORT || 3000
const app = require('./app')

/////// Scraping and Emailing section /////////////
const puppeteer = require('puppeteer')
const nodemailer = require('nodemailer')
const cron = require('node-cron')

// const scrapper = async (url) => {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.goto(url);

//     const titleSelector = '#productTitle'
//     await page.waitForSelector(titleSelector)
//     const res = await page.evaluate(() => {
//         const itemName = document.querySelector('#productTitle').innerText;
//         const itemImage = document.querySelector("#imgTagWrapperId > img").src
//         const itemPrice = parseFloat(document.querySelector('span.a-price > span').innerText.replace(/[^0-9.-]+/g, ""));

//         return {
//             itemName,
//             itemImage,
//             itemPrice
//         }
//     })
//     // console.log(res)
//     await browser.close()
//     return res;
// }

///Sony camera
// scrapper('https://www.amazon.com/Sony-Full-Frame-Mirrorless-Interchangeable-Camera/dp/B09JZT6YK5/')

/// Sweater
// scrapper('https://www.amazon.com/Hanes-EcoSmart-Fleece-Sweatshirt-Small/dp/B072K68D77/')

const init = async () => {
    try {
        const port = process.env.PORT || 3000;
        await syncAndSeed()
        await app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
    }
    catch (err) {
        console.log(err)
    }
}

init()