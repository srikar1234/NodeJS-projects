console.log('Client side JS file is loaded')

// Fetch data from a url
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')


weatherform.addEventListener('submit', (event)=>{
    event.preventDefault()
    const location = search.value
    const baseurl = 'http://localhost:3000/weather/?address='
    const finalurl = baseurl+location
    msg1.textContent = 'Loading'
    msg2.textContent = ''
    fetch(finalurl).then( (response) =>{
        response.json().then((data) =>{
            if(data.error){
                msg1.textContent = 'Error: ' + data.error
                msg2.textContent = 'Please try again'
            }
            else{
                msg1.textContent = 'Location: ' + data.loc
                msg2.textContent = " Temperature: "+ data.FCST.temperature + ' F, Description:' + data.FCST.description + ' but feels like: '+data.FCST.feelslike + ' F'
            }
        })
    })
    weatherform.reset()
})