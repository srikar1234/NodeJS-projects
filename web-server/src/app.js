// Express is a single function not an object
const express = require('express')
// Core node module: path
const path = require('path')

const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// We configue our servers
const app = express()

// Define paths for express config
// Way to customize views path
let viewsPath = path.join(__dirname, '../templates/views')
// Way to customize the server
let publicpath = path.join(__dirname, '../public')
// Way to customize partials 
let partialsPath = path.join(__dirname, '../templates/partials')

// Setup handebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
// Setting up the partials
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicpath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Web Weather App',
        name: 'Srikar Kale'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name:'Srikar Kale'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help page',
        message:'If you are stuck, reach out to me',
        name: 'Srikar Kale'
    })
})

app.get('/Weather', (req, res) => {
    if(!req.query.address)
        return res.send({
            error: 'Need a valid address to search for weather data'
        })
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error)
            return res.send({
                error
            })
        forecast(longitude, latitude, (error, forecastData) => {
            if(error)
                return res.send({
                    error
                })
            res.send({
                Adr: req.query.address,
                FCST: forecastData,
                loc: location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error page',
        name:'Srikar Kale',
        message:'Help page not found'
    })
})

// Should be the last so the other matching routes get to go to their place
app.get( '*', (req, res) => {
    res.render('error', {
        title: 'Error page',
        name:'Srikar Kale',
        message:'404 Page Not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up and running on port 3000')
})