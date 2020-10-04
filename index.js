const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const CLO = require('./controller/CleaningOrder')
const mongoose = require('mongoose')


const uri = 'mongodb+srv://adminBenjamin:RT65qwery@mrb-shared-rent-clus.eyclc.mongodb.net/mrb-shared-rent-db?retryWrites=true&w=majority'
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
const mConnect = mongoose.connection
mConnect.once('open', () => {
    console.log('Connected')
})


app.use(express.static('public'))


app.set('view engine', 'ejs')

app.use(bodyParser.json())



app.get('/', (req, res) => {
    res.render('index', {title: 'Shared Rent', page: ''})
})

app.get('/dashboard', (req,res) => {
    res.render('index', {title: 'Shared Rent', page: 'dashboard'})
})

app.get('/cleaning', async (req,res) => {
    let clo = new CLO()
    let cleaner = await clo.getCurrentCleaning()

    let start = new Date(cleaner.start.toString()).toLocaleDateString('hu-HU')
    let end = new Date(cleaner.end.toString()).toLocaleDateString('hu-HU')
    
    let current = {
        user: cleaner.user,
        start: start,
        end: end,
        week: cleaner.week
    }
    let nextCleaner = {}
    res.render('index', {title: 'Shared Rent', page: 'cleaning', current, nextCleaner})
})

app.get('/bills', (req,res) => {
    res.render('index', {title: 'Shared Rent', page: 'bills'})
})

app.get('*', (req, res) => {
    res.render('index', {title: 'Shared Rent', page: '404'})
})

app.listen(PORT, () => {console.log(`Application started`)})