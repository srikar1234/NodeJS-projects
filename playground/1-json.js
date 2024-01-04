const fs = require('fs')
// // Data stored as a JS object
// // Convert it to JSON
// const book = {
//     title:'Ego is the enemy',
//     author:'Ryn Holiday'
// }

// // JS method that takes in an object or array or value and returns a JSON string
// const bookJSON = JSON.stringify(book)

// console.log(bookJSON)

// // Takes the JSON data in and convert it to an object
// const bookObj = JSON.parse(bookJSON)

// console.log(bookObj.author)


// fs.writeFileSync('1-json.json', bookJSON)

// // // Doesnt work with objects
// // fs.appendFileSync('1-json.json', bookObj)

// // What comes back is not a string, but a buffer - a way for JS to return binary data
// const databuffer = fs.readFileSync('1-json.json')
// const dataJSON = databuffer.toString()
// // This converts the bits to strings
// console.log(databuffer.toString())


// const data = JSON.parse(dataJSON)

// console.log(data.title)


const databuffer = fs.readFileSync('1-json.json')
// Stringify string of JSON
const objectString = databuffer.toString()

const object = JSON.parse(objectString)
console.log(object)

object.name = 'Srikar'
object.age = 28

console.log(object)

const newobjectstring = JSON.stringify(object)
fs.writeFileSync('1-json.json', newobjectstring)