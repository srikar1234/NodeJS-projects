// Without the default value the input is undefined
const greeter = (name = 'User') =>{
    console.log('Hello ' + name)
}

greeter()