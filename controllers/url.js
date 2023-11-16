const { nanoid } = require('nanoid')
const URL = require('../models/url')
async function handleGenerateNewShortUrl (req,res) {
    const body = req.body
    if(!body.URL) return res.status(400).json({error: 'URL must be provided'})
    const shortId = nanoid(8)
    await URL.create({
        shortId: shortId,
        redirectUrl: body.URL,
        visitHistory: []
    })
    return res.json({
        id: shortId
    })
}

async function handleGetAnalytics (req,res) {
    const shortId = req.params.shortId
    const response = await URL.findOne({shortId})
    return res.json({
        visits: response.visitHistory.length,
        analytics: response.visitHistory
    })
}

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics }