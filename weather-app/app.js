const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const address = process.argv[2]

if(!address){
    return console.log('Error: Add a valid location')
} else {
    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if(error)
            return console.log('Error: ',error)
        forecast(longitude, latitude, (error, {temperature} = {}) => {
            if(error)
                return console.log('Error: ', error)
            console.log('location: ' + location +' with  temperature: ' + temperature)
        })
    })
}