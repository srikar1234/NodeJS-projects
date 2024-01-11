const express = require('express')
const mongoose = require('./db/mongoose')
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
        response.send(users)
    }).catch((error)=>{
        response.send(error)
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

app.listen(port, ()=>{
    console.log('Server is up on port: ', port)
})