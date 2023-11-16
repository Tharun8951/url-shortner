const router = require('express').Router()
const { handleGenerateNewShortUrl, handleGetAnalytics } = require('../controllers/url')

router.post('/', handleGenerateNewShortUrl)
.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router