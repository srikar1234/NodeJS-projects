const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')


//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    // What can abe added to the add command on the command line
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
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
        console.log(chalk.green.bold.underline('Listing all the notes here:'))
		notes.list()
	}
})

// Create a read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder:{
		title:{
			describe:'Read a note',
			demandOption: true,
            type: 'string'
        },
		body:{

        }
	},
	handler(argv) {
        console.log('reading a particular note: ' + argv.title)
		notes.read(argv.title)
	}
})

yargs.parse()