// Call either resolve or reject
// cant call same function twice
const doWorkPromise = new Promise( (resolve, reject) => {
    setTimeout(() => {
        // Only one of the two functions will be called. The top most one
        reject('Things went wrong')
        resolve([7,4,1,34])
    }, 2000);
})

// this function works well only when things go well
// Two functions of which only one will ever run
// Easy to not mess up
// Rules behind the scenes
doWorkPromise.then( (result) => {
    // Success
    console.log(result)
}).catch((error) => {
    // Failure
    console.log(error)
})


// promise -> pending ->resolve or reject is executed
// Resolve -> fulffilled
// Reject -> rejected

const add = (a, b) =>{
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(a+b)
            }, 2000);
    })
}

// Promise chaining
// add(4,5).then( (sum) =>{
//         console.log(sum)
//         // Usual way of nesting functions using promises
//         // add(sum, 5).then((sum2) =>{
//         //     console.log(sum2)
//         // }).catch((error) =>{
//         //     console.log(error)
//         // })
// }).catch((error) =>{
//     console.log(error)
// })


// Simpler way of doing it using promise chaining
add(4,5).then((sum) =>{
    console.log(sum)
    return add(sum, 5)
}).then((sum2) =>{
    console.log(sum2)
}).catch((error) => {
    console.log(error)
})