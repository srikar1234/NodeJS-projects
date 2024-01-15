// If we dont return anything from a function, undefined is implicitly returned
// Async function uses the await feature
// Async always returns a promise that promise is fullfilled is filled with the value we choose to return
// const doWork = async () =>{
//     return 'Srikar'
// }




const add = (a, b) =>{
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(a < 0 || b <0)
                    return reject(' Negative numbers are not allowed')
                resolve(a+b)
            }, 2000);
    })
}

// Simpler way of doing it using promise chaining
add(4,5).then((sum) =>{
    console.log(sum)
    return add(sum, 5)
}).then((sum2) =>{
    console.log(sum2)
}).catch((error) => {
    console.log(error)
})

const doWork = async () =>{
    // // This goes to catch
    // throw new Error('Something went wrong')
    // // This goes to result
    // return 'Srikar'
    // Await operator returns a promise
    // Looks synchronous to perform asynchronous tasks
    // No need to promise chain when using await
    // Easy access to scope of variables 
    // If any promise is rejected the code stops running
    const sum = await add(3,4)
    const sum2 = await add(sum, -1)
    const sum3 = await add(sum2, 3)
    return sum3
}

// Await can be used only in async operator
doWork().then((result) =>{
    console.log('Result: ', result)
}).catch((error) =>{
    console.log('Error: ',error)
})
