const request = require('postman-request')
const geocode = (address, callback) =>{
    
    const baseUrl = 'https://geocode.maps.co/search?q='
    const key = '&api_key=65993b629ef8e166808607uqmab5006'
    const finalurl = baseUrl + address + key

    request({url:finalurl , json: true}, (error, {body}) => {
        if(error)
            callback('Unable to connect to Geocoding server', undefined)
        else if(body.length === 0)
            callback('Please enter a valid location', undefined)
        else{
            const latitude = body[0].lat
            const longitude = body[0].lon
            const location = body[0].display_name
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode