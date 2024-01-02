console.log('utils.js')

 // The variable scope is within the file 
const names = 'Srikar Kale'

const add =  function (a, b){
    return a + b
}

//Return value of the utils.js page which can be captured in other JS files which import this JS file as a module

// Return a single variable names
// module.exports = names

// Return a function called add
module.exports = add