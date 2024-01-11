// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

const {MongoClient, ObjectId} = require('mongodb')

// const id = new ObjectId()
// console.log(id)
// console.log(id.toString())
// console.log(id.getTimestamp())
// console.log(id.id.length)
// console.log(id.toHexString().length)
const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

const client = new MongoClient(connectionURL)

async function run(){
    try{
        const dbreference = client.db(dbName)
        //------------------------------------------
        // Crud
        // await dbreference.collection('tasks').insertMany([{
        //     _id: id,
        //     description: 'Srikar',
        //     completed: true
        // },{
        //     // String addition
        //     // _id: id+1,
        //     description: 'Mooch',
        //     completed: true
        // },{
        //     description:'Runu',
        //     completed: false
        // }]).then((result, error) => {
        //     if(error)
        //         return console.log('Unable to insert many docs')
        //     console.log( result.insertedIds)
        // })

        //------------------------------------------

        // cRud
        // Find one
        // await dbreference.collection('tasks').findOne({_id: new ObjectId('659e39e26c5f4fb5435e0222')}).then(
        //     (result, error) =>{
        //         if(error)
        //                 return console.log('Unable to fetch  docs')
        //         if(result != null)
        //             return console.log( result.description)
        //         else
        //             return console.log('NULL found')
        //     }
        // )
        // Find doesnt have a callback value
        // Returns a pointer or a cursor
        // await dbreference.collection('tasks').find({ completed:false }).toArray().then((result, error) =>{
        //     if(error)
        //         return console.log('Error')
        //     if(result != null)
        //         console.log(result)
        // })
        
        //------------------------------------------ 

        // crUd
        // await dbreference.collection('tasks').updateOne({_id: new ObjectId('659e39e26c5f4fb5435e0222')}, {$set:{
        //     completed: true
        // }}).then((result) => {
        //     console.log(result)
        // }).catch( (error) => {
        //     console.log(error)
        // })

        // await dbreference.collection('tasks').updateMany({
        //     completed:true
        // }, {
        //     $set:{
        //         completed:false
        //     }
        // }).then((result)=>{
        //     console.log(result)
        // }).catch((error) =>{
        //     console.log(error)
        // })

        // -------------------------------------
        // cruD

        // await dbreference.collection('tasks').deleteOne({
        //     description: 'Mooch'
        // }).then((result) => {
        //     console.log(result)
        // }).catch((error) => {
        //     console.log(error)
        // })

        // await dbreference.collection('tasks').deleteMany({
        //     completed: false
        // }).then((result) => {
        //     console.log(result)
        // }).catch((error) => {
        //     console.log(error)
        // })
    }catch(err){
        console.log(err)
    }
    finally{
        console.log('closing')
        await client.close()
    }
}

// Promises build upon the call back pattern
// Promises are enhancements of callbacks
// Promises -> then -> catch
run()