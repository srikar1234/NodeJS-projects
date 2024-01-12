require('../src/db/mongoose')
const Task = require('../src/Models/Task')


// Change the age of the user and finding the other users of the same age using promise chaining
//659eb5823393b2a2e7634296
// Find By Id and Update will return the document
Task.findByIdAndDelete( '659eb6b73393b2a2e763429b').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed:false})
}).then((result) =>{
    console.log(result)
}).catch((error) => {
    console.log(error)
}) 