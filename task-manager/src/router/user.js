const express = require('express')
const ObjectID = require('mongoose').Types.ObjectId;
const User = require('../Models/User')
const auth = require('../middleware/auth')
const router = new express.Router()
// Resource creation
// Handler for adding new users
// Using aync -await
// Sign up
router.post('/users',  async (request, res) => {
    const user = new User(request.body)
    try{
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }
    catch(e){
        res.status(400).send(e)
    }
})

// Logging in Users
// resuable function
// login
router.post('/users/login', async (request, res) =>{
    try{
        const email = request.body.email
        const pass = request.body.password
        // Generate the token for a specific user instance. hence user is used below instead of User
        const user = await User.findByCredentials(email, pass)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(error){
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (request, response) =>{
    // target the specific token used to log out from that device, not all devices of a current user
    try{
        const tokens = request.user.tokens
        request.user.tokens = tokens.filter( (token) =>{
            // Remove the token from the tokens array
            // Check if the current token is the same one used for authentication
            // tokens array is an array of objects called token
            return token.token !== request.token
  
        })
        await request.user.save()
        response.send()
    }catch(error){
        response.status(500).send()
    }
})

// Route to handle all the logouts at once
router.post('/users/logoutAll', auth, async (request, response) =>{
    // target the specific token used to log out from that device, not all devices of a current user
    try{
        request.user.tokens = []
        await request.user.save()
        response.send()
    }catch(error){
        response.status(500).send()
    }
})

// Handler for getting the users list
// Add authentication
router.get('/users/me' ,  auth, async (request, res) =>{
    // try{
    //     const users = await User.find({})
    //     res.status(220).send(users)
    // }
    // catch(error){
    //     res.status(500).send(error)
    // }
    res.send(request.user)
})


// Get user by id, dynamic id in the get method. Get access to route handler
// Route parameters
router.get('/users/:id', async (request, res) => {
    const _id = request.params.id
    if (!ObjectID.isValid(_id)) 
        return res.status(406).send('User with that invalid id does not exist!')
    try{
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send('User not found or does not exist!')
        }
        res.send(user)
    }catch(error){
        res.status(500).send(error.name)
    }
})

// Http method for updating resources
// Most complex of all ops
router.patch('/users/:id', async (request, res) => {
    //Invalid updates are automatically ignored by Mongoose. But we write it for making sense of the logic and being able to change the status of the response
    // From the updates collections, gather the keys required
    const updates = Object.keys(request.body)
    // Keep a set of updates that are allowed to be updated
    const allowedUpdate =['name', 'email', 'password', 'age']
    // Boolean operation to check if every keys needed to be updated are part of the allowed Update list
    const isvalidOperation = updates.every( (update) =>{
        return allowedUpdate.includes(update)
    })
    // If such a key doesnt exist, return error
    if(!isvalidOperation)
        return res.status(400).send('Error: Invalid update')

    const _id = request.params.id
    if (!ObjectID.isValid(_id)) 
        return res.status(406).send('Task with that invalid id does not exist!')
    // Mongoose method: Find by Id and update
    try{
        //  // Get the latest data with new:true
        // // This bypasses the middleware
        // const user = await User.findByIdAndUpdate(_id, request.body, { new:true, runValidators: true })
        const user = await User.findById(_id)
        // User doesnt exist
        if (!user) {
            return res.status(404).send('User not found or does not exist!')
        }
        updates.forEach( (update) => user[update] = request.body[update])
        await user.save()
        res.send(user)
    }
    catch(error){
        res.status(400).send(error)
    }
})

// Handlers for Deleting resources
// Deleting Users
router.delete('/users/:id', async (request, res) =>{
    const _id = request.params.id
    if (!ObjectID.isValid(_id)) 
        return res.status(406).send('Task with that invalid id does not exist!')
    try{
        const user = await User.findByIdAndDelete(_id)
        if(!user)
            return res.status(404).send('Unable to find User to delete')
        res.send(user)
    }
    catch(error){
        res.status(500).send(error)
    }
})


module.exports = router