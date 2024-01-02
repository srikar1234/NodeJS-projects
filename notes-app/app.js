// Require is needed to load modules
const fs = require('fs')

// Syncronous file write
fs.writeFileSync('notes.txt', 'My name is Andrew.')

// Syncronous file append where the last char left off in the txt file
fs.appendFileSync('notes.txt', ' sec line.')

// Loading another file as a module to this file 
// Since the value utils.js is exporting is a name we store it as a variable

const chalk = require('chalk')
const variable = require('./utils.js')

// Load the module of notes.js
const getNotes = require('./notes.js')

const validator = require('validator')

// Use the function from utils.js
let sum = variable(3, -3)
console.log(sum)

// Use the function from notes.js
sum = getNotes()
console.log(sum)

console.log(validator.isEmail('andrew@example.com'))
console.log(validator.isEmail('srikar.kale@research.iiit.ac.in'))
console.log(validator.isEmail('example.come'))
console.log(validator.isURL('https://mead.io'))
console.log(validator.isURL('https/mead.io'))


// Inverse changes the styling
console.log(chalk.blue.bold.underline.inverse('Success'))
console.log(chalk.bold('Success'))
console.log(chalk.inverse('Success'))

// argv = argument vector
// First 2 arguments are paths for node js executable and paths to the app.js file
console.log(process.argv[2])

const command = process.argv[2]

if(command === 'add'){
    console.log('adding note')
} else if (command === 'remove'){
    console.log('removing note')
}


console.log(process.argv)