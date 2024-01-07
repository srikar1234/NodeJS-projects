const request = require('postman-request')
const geocode = (address, callback) =>{
    
    const baseUrl = 'https://geocode.maps.co/search?q='
    const key = '&api_key=65993b629ef8e166808607uqmab5006'
    const finalurl = baseUrl + address + key

    request({url:finalurl , json: true}, (error, response) => {
        if(error)
            callback('Unable to connect to Geocoding server', undefined)
        else if(response.body.length === 0)
            callback('Please enter a valid location', undefined)
        else{
            const firstdata = response.body[0]
            const latitude = firstdata.lat
            const longitude = firstdata.lon
            const location = firstdata.display_name
            callback(undefined, {
                lat: latitude,
                lon: longitude,
                loc: location
            })
        }
    })
}

module.exports = geocode