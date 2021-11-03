const { db, syncAndSeed } = require('./db')
const PORT = process.env.PORT || 3000
const app = require('./app')

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