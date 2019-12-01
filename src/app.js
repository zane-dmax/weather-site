const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Zane'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Zane'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Zane'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help - 404',
        message: 'Help article not found',
        author: 'Zane'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        message: 'Page not found',
        author: 'Zane'
    })
})

app.listen(3000, () => {
    console.log('Server up and running!')
})