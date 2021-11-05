const { syncAndSeed } = require('./db')
const runCron = require('./cron')
const app = require('./app')

const init = async () => {
    try {
        const port = process.env.PORT || 3000;
        await syncAndSeed()
        // await runCron()
        await app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
    }
    catch (err) {
        console.log(err)
    }
}

init()