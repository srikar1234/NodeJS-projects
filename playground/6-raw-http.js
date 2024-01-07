const https = require('https')
const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=e26cfbfa0ccd23ae8adfbeba47570a71&units=f&query='

const request = http.request(url, (response) =>{
    let data = ''

    // Http streams data in chunks
    response.on('data', (chunk)=>{
        data = data + chunk.toString()
    })


    response.on('end', ()=>{
        const body = JSON.parse(data)
        console.log(body)
    })
})
// Listerner
request.on('error', (error)=> {
    console.log('Error:', error)
})
request.end()