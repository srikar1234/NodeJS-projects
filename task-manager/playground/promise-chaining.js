require('../src/db/mongoose')
const User = require('../src/Models/User')


// Change the age of the user and finding the other users of the same age using promise chaining
// 659e6f3e3168f8eabf2b0c4d
// Find By Id and Update will return the document
// User.findByIdAndUpdate( '659e6f3e3168f8eabf2b0c4d', {age: 25}, { new: true }).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age: 25})
// }).then((result) =>{
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// }) 

// Simpler async await functions to reduce complications
const updateAgeAndCount = async (id, age)=>{
    const user = await User.findByIdAndUpdate(id, {age: age})
    const count= await User.countDocuments({age: age})
    return count
}

updateAgeAndCount('659e6f3e3168f8eabf2b0c4d', 40).then((count) =>{
    console.log(count)
}).catch((error) =>{
    console.log(error)
})