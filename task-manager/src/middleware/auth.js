const jwt = require('jsonwebtoken')
const User = require('../Models/User')

const auth = async(request, response, next) =>{
    try{
        const token  =  request.header('Authorization').replace('Bearer', '').trim()
        const decoded = jwt.verify(token, 'thisismynewcourse')
        // Finding a user with the decoded id but must still be logged in using the tokens array inside the user
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        request.token = token
        request.user = user
        next()
    }catch(error){
        response.status(401).send({error:'Please authenticate'})
    }
}

module.exports = auth

// without middleware: new req -> run route handler
// With middleware: new req -> do something -> run route handler
// More fine grain control over customization of the app

// Register a middleware function to run
// app.use((request, response, next) =>{
//     if(request.method === 'GET')
//         response.status(404).send('Get req are disabled')
//     else{
//         next()
//     }   
// })

// middleware for when the site is down
// app.use((request, response, next) =>{
//     response.status(503).send('Site is under maintaince, please try again after a while')
// })