const express = require('express')
const mongoose = require('./db/mongoose')
const ObjectID = require('mongoose').Types.ObjectId;
const User = require('./Models/User')
const Task = require('./Models/Task')

const app = express()
const port = 3000

app.use(express.json())

// Resource creation
// Handler for adding new users
app.post('/users', (request, response) => {
    const user = new User(request.body)
    user.save().then((result) => {
        response.send(task)
    }).catch((error) =>{
        // Change status of the post
        // Check Http statuses
        response.status(400).send(error)
    })
})

// Handler for getting the users list
app.get('/users' , (request, response) =>{
    User.find({ }).then((users)=>{
        response.status(220).send(users)
    }).catch((error)=>{
        response.status(500).send(error)
    })
})

// Get user by id, dynamic id in the get method. Get access to route handler
// Route parameters
app.get('/users/:id', (req, res) => {
    // res.send(req.params)
    const _id = req.params.id
 
    //Add this extra code start from here
    if (!ObjectID.isValid(_id)) {
        return res.status(406).send('User with that invalid id does not exist!')
    }
    // extra code end here
 
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send('User not found or does not exist!')
        }
        res.send(user)
    }).catch((err) => {
        res.status(500).send(err.name)
    })
})

// Handler for adding new tasks
app.post('/tasks', (request, response) => {
    const task = new Task(request.body)
    task.save().then((result) => {
        response.send(task)
    }).catch((error) =>{
        response.status(400).send(error)
    })
})


// Handler for getting the users list
app.get('/tasks' , (request, response) =>{
    Task.find({ }).then((tasks)=>{
        response.status(220).send(tasks)
    }).catch((error)=>{
        response.status(500).send(error)
    })
})

// Get task by id, dynamic id in the get method. Get access to route handler
// Route parameters
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
 
    if (!ObjectID.isValid(_id)) {
        return res.status(406).send('Task with that invalid id does not exist!')
    }
 
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send('Task not found or does not exist!')
        }
        res.send(task)
    }).catch((err) => {
        res.status(500).send(err.name)
    })
})



app.listen(port, ()=>{
    console.log('Server is up on port: ', port)
})