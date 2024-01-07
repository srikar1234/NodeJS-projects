const request = require('postman-request')

const forecast = (longitude, latitude, callback) =>{
    const baseUrl = 'http://api.weatherstack.com/current?access_key=e26cfbfa0ccd23ae8adfbeba47570a71&units=f&query='
    const finalurl = baseUrl + latitude + ',' + longitude
    request({url:finalurl , json: true}, (error, response) => {
        if(error)
            callback('Unable to connect to Geocoding server', undefined)
        else if(response.body.error)
            callback('Please enter a valid location', undefined)
        else{
            const data = response.body
            const temperature = data.current.temperature
            const feelslike = data.current.feelslike
            const description = data.current.weather_descriptions[0]
            const location = data.location.name + ', ' + data.location.region +', ' + data.location.country
            callback(undefined, {
                temp: temperature,
                feelslike: feelslike,
                desc: description,
                loc: location
            })
        }
    })
}

module.exports = forecast