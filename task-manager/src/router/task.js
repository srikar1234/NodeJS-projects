const express = require('express')
const router = new express.Router()
const ObjectID = require('mongoose').Types.ObjectId;
const Task = require('../Models/Task')

// Handler for adding new tasks
router.post('/tasks', async (request, res) => {
    const task = new Task(request.body)
    try{
        await task.save();
        res.send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

// Handler for getting the users list
router.get('/tasks' , async (request, res) =>{
    try{
        const tasks = await Task.find({})
        res.status(220).send(tasks)
    }catch(error){
        res.status(500).send(error)
    }
})

// Get task by id, dynamic id in the get method. Get access to route handler
// Route parameters
router.get('/tasks/:id', async (request, res) => {
    const _id = request.params.id
 
    if (!ObjectID.isValid(_id)) 
        return res.status(406).send('Task with that invalid id does not exist!')
    try{
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send('Task not found or does not exist!')
        }
        res.send(task)
    }catch(error){
        res.status(500).send(error.name)
    }
})

router.patch('/tasks/:id', async(request, res) =>{
    const updates = Object.keys(request.body)
    const allowedUpdate = ['description', 'completed']
    const isvalidOperation = updates.every((update) =>{
        return allowedUpdate.includes(update)
    })
    if(!isvalidOperation)
        return res.status(400).send('Error: Invalid Update')

    const _id = request.params.id;

    if(!ObjectID.isValid(_id))
        return res.status(406).send('Task with that invalid id does not exist!')

    try{
        const task = await Task.findByIdAndUpdate(_id, request.body, {new:true, runValidators:true})
        if(!task)
            return res.status(404).send('User not found or does not exist!')
        res.send(task)
    }
    catch(error){
        res.status(400).send(error)
    }
})

// Deleting tasks
router.delete('/tasks/:id', async (request, res) =>{
    const _id = request.params.id
    if (!ObjectID.isValid(_id)) 
        return res.status(406).send('Task with that invalid id does not exist!')
    try{
        const task = await Task.findByIdAndDelete(_id)
        if(!task)
            return res.status(404).send('Unable to find User to delete')
        res.send(task)
    }
    catch(error){
        res.status(500).send(error)
    }
})

module.exports = router