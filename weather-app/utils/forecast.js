const request = require('postman-request')

const forecast = (longitude, latitude, callback) =>{
    
    const baseUrl = 'http://api.weatherstack.com/current?access_key=e26cfbfa0ccd23ae8adfbeba47570a71&units=f&query='
    
    const finalurl = baseUrl + latitude + ',' + longitude
    
    request({url:finalurl , json: true}, (error, {body} = {}) => {
        if(error)
            callback('Unable to connect to Geocoding server', undefined)
        else if(body.error)
            callback('Please enter a valid location', undefined)
        else{
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            callback(undefined, {
                temperature,
                feelslike,
                description,
            })
        }
    })
}

module.exports = forecast