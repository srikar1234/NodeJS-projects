// Express is a single function not an object
const express = require('express')
// Core node module: path
const path = require('path')
// We configue our servers
const app = express()

app.set('view engine', 'hbs')

// Way to customize the server
let publicpath = path.join(__dirname, '../public')

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Web Weather App',
        name: 'by Srikar Kale'
    })
})
app.use(express.static(publicpath))

app.get('/Weather', (req, res) => {
    res.send([{
        forecast: 'forecast',
        location: 'location'
    }])
})

app.listen(3000, ()=>{
    console.log('Server is up and running on port 3000')
})