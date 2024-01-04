console.log('Starting')

// Requires 2 parameters, 1st a function, & 2nd a time amount in milliseconds
setTimeout(()=>{
    console.log('Inside timeout')
}, 5000)

// Why is zero second timer coming after last stopping statement
setTimeout(()=>{
    console.log('Inside timeout 2')
}, 0)

// Why is zero second timer coming after last stopping statement
setTimeout(()=>{
    console.log('Inside timeout 3')
}, 0)

console.log('Stopping')

console.log('stopping 2')