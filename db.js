const mongoose = require('mongoose')

async function handleConnectToMongoDB(url) {
    return mongoose.connect(url)
}

module.exports = {
    handleConnectToMongoDB
}