const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const init = async () => {
    try {
        // const port = PORT.process.env || 3000;
        const port = 3000;

        await app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
    }
    catch (err) {
        console.log(err)
    }
}

init()