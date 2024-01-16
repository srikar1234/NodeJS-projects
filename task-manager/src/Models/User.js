const mongoose = require('mongoose')
const validator = require('validator')
const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        // Remove a bunch of white spaces before and after the name
        trim: true
    },
    age:{
        type: Number,
        default:18,
        validate(value){
            if(value <=0)
                throw new Error('Age not valid')
        }
    },
    email:{
        type: String,
        required: true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Invalid email')
        }
    },
    password:{
        type:String,
        required: true,
        trim:true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password'))
                throw new Error('Password cannot have password')
        }
    },
    tokens:[{
        token: {
            type:String,
            required:true
        }
    }]

})

// With encryption we get the original value back
// With Hashing, we will not be able to get the original values back - One way algorithms
// const crypt = require('bcryptjs')
// const myFunction = async () =>{
//     const password = 'Red12345!'
//     const hashedPassword = await crypt.hash(password, 8)
//     console.log(password, hashedPassword)
//     const isMatch = await crypt.compare('Red12345!', hashedPassword)
//     console.log(isMatch)
// }
// myFunction()

// const jwt =require('jsonwebtoken')
// const myFunction = async () =>{
//     const authToken = await jwt.sign({id: 'abc123'}, 'thisismynewcourse', {expiresIn: '7 days' })
//     console.log(authToken)
//     const payload = await jwt.verify(authToken, 'thisismynewcourse')
//     console.log(payload)
// }
// myFunction()

// methods are accesible on the instance of an object
// Instance methods
userSchema.methods.generateAuthToken = async function () {
    const user = this
    // Payload object, secret
    const token = await jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    // Add to the user instance
    user.tokens = user.tokens.concat({token: token})
    await user.save()
    return token
}

// Statics methods are accessible on the Models
// Model methods
// findOne parameter is an object for the search criteria
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error('Incorrect user email id or password')
    }

    // Verify the password
    const isMatch = await crypt.compare(password, user.password)
    if(!isMatch)
        throw new Error('Incorrect user email id or password')

    return user
}

// Middleware
// This has to be a standard function not an arrow function because of the 'this' binding
// Next is provided to signal if we are done since we are writing an asychronous process
// Pre is before
// Hash the password BEFORE saving
userSchema.pre('save', async function(next){
    const user = this
    // if the password is modified during creation or updation
    if(user.isModified('password'))
        user.password = await crypt.hash(user.password, 8)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User