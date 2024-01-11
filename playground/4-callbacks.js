// // The function called inside settimeout function is a call back function. Call back functions are functions that are passed as an argument inside another function.
// // Using callback functions in an synchronous way
// // Not all callback functions are asynchronous
// setTimeout(() => {
//     console.log('Two seconds are up')
// }, 2000);

// const names = ['Andrew', 'Jen', 'Jes']

// // Call back function as a synchronous function
// const shortnames = names.filter((name) =>{
//     return name.length <= 4
// })

// console.log(shortnames)

// //return type of sending data doesnt work in asynchronous functions as they give undefined. Use asynchronous functions (remeber their way of execution after main function). Thats the key
// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitude: 0
//         }
//         callback(data)
//     }, 5000);
// }

// geocode('Philly', (data) =>{
//     console.log(data)
//     console.log(data.latitude)
//     console.log(data.longitude)
// })



// //
// // 1. Define an add function that accepts the correct arguments
// // 2. Use setTimeout to simulate a 2 second delay
// // 3. After 2 seconds are up, call the callback function with the sum
// // 4. Test your work!

// const add = (var1, var2, callback) => {
//     setTimeout(() => {
//         const var3 = var1 + var2
//         callback(var3)
//     }, 2000);
// }

// add(1, 4, (sum) => {
//     console.log(sum) // Should print: 5
// })

const doworkcallback = (callback) =>{
    setTimeout(() => {
        callback(undefined, 'this is my error')
        callback('Success', undefined)
    }, 2000);
}

doworkcallback( (result, error) => {
    if(error)
        return console.log(error)
    console.log(result)
})