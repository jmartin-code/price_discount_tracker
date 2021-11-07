const puppeteer = require('puppeteer')

const scrapper = async (url) => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    ///// force the page to be desktop ////////////////
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.goto(url);

    const titleSelector = '#productTitle'
    await page.waitForSelector(titleSelector)
    const res = await page.evaluate(() => {
        const itemName = document.querySelector('#productTitle').innerText;
        const itemImage = document.querySelector("#imgTagWrapperId > img").src
        const itemPrice = parseFloat(document.querySelector('span.a-price > span').innerText.replace(/[^0-9.-]+/g, ""));

        return {
            itemName,
            itemImage,
            itemPrice
        }
    })
    await browser.close()
    return res;
}

module.exports = scrapper