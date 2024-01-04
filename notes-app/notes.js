const fs = require('fs')
const chalk = require('chalk')

const getNote = () => {
    return 'Your Notes....'
}

// This function is useful for loading the existing notes from the JSON file
const loadNotes = () =>{
    // If any of the lines in the try block gives an error, then the code will go to the catch block
    try{
        const databuffer = fs.readFileSync('notes.json')
        const dataJSON = databuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    } 
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const addNote = (title, body) => {
    const notes = loadNotes()
    
    const duplicateNotes = notes.filter(
        (note) => {
            return note.title === title
        }
    )

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.inverse('New note added'))
        saveNotes(notes)
    }
    else{
        console.log(chalk.red.inverse('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(
        (note) => {
            return note.title !== title
        }
    )
    if(notes.length === duplicateNotes.length)
        console.log(chalk.red.inverse('No notes to delete'))
    else{
        console.log(chalk.green.inverse('Deleting notes...'))
        saveNotes(duplicateNotes);
    }
}

// This module is exporting multiple functions -> getNotes and addNote
module.exports = {
    get: getNote,
    add: addNote,
    remove: removeNote
}