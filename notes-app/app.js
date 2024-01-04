const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')

// //Require is needed to load modules
// const fs = require('fs')
// // Loading another file as a module to this file 
// // Since the value utils.js is exporting is a name we store it as a variable
// const variable = require('./utils.js')
// // Load the module of notes.js

const notes = require('./notes.js')

// // Syncronous file write
// fs.writeFileSync('notes.txt', 'My name is Andrew.')
// // Syncronous file append where the last char left off in the txt file
// fs.appendFileSync('notes.txt', ' sec line.')

// // Use the function from utils.js
// let sum = variable(3, -3)
// console.log(sum)

// // Use the function from notes.js
// sum = getNotes()
// console.log(sum)

// console.log(validator.isEmail('andrew@example.com'))
// console.log(validator.isEmail('srikar.kale@research.iiit.ac.in'))
// console.log(validator.isEmail('example.come'))
// console.log(validator.isURL('https://mead.io'))
// console.log(validator.isURL('https/mead.io'))

// // Inverse changes the styling
// console.log(chalk.blue.bold.underline.inverse('Success'))
// console.log(chalk.bold('Success'))
// console.log(chalk.inverse('Success'))

// // argv = argument vector
// // First 2 arguments are paths for node js executable and paths to the app.js file
// console.log(process.argv[2])

// const command = process.argv[2]

// if(command === 'add'){
//     console.log('adding note')
// } else if (command === 'remove'){
//     console.log('removing note')
// }

// console.log(process.argv)

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    // What can abe added to the add command on the command line
    builder: {
        title: {
            describe: 'Note title',
            // This makes sure the title is added for the add function to work correctly
            // Default demandOption is false
            //Without title, the command throws an error
            demandOption: true,
            // title will always be string instead as boolean (by default)
            type: 'string'
        },

        // Similar to title
        body: {
            describe: 'Note body',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv) {
        notes.add(argv.title, argv.body)
    },
})
 
// Create a remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{

        }
    },

    handler(argv)  {
        notes.remove(argv.title)
    }
})

// Create a list command
yargs.command({
    command: 'list',
    describe: 'List all the notes',
    handler(){
        console.log('Listing all the notes here!')
    }
})

// Create a read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler() {
        console.log('reading a particular note!')
    }
})

yargs.parse()
// console.log(yargs.argv)