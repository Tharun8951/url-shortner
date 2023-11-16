const express = require('express')
const app = express()
app.use(express.json())
//connecting to database
const {handleConnectToMongoDB} = require('./db')
handleConnectToMongoDB('mongodb://127.0.0.1:27017/short-urls').then(()=>{
    console.log('connected to database')
})

const router = require('./routes/url')
const URL = require('./models/url')

app.get('/', (req,res)=>{
    res.send('Hello world, this is url-shortner')
})

app.use('/URL', router)

app.get('/:shortId', async(req,res)=>{
    const shortId = req.params.shortId
    const redirect = await URL.findOneAndUpdate({ shortId }, {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      })
      if (!redirect) {
        return res.status(404).send('URL not found');
    }
    res.redirect(redirect.redirectUrl);
})


app.listen(8080, ()=>{
    console.log('server started at port 8080')
})

