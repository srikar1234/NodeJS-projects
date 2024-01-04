// regular JS function
const square = function(x){
    return x*x
}

console.log(square(3))

// Create using an arrow function

const sq = (x) => {
    return x*x
}

console.log(sq(3))

// Shorthand syntax for simplx functions
const squares = (x) => x * x

console.log(squares(2))


// Arrow functions as properties of an object
const event = {
    name: 'birthday party',
    guestList:['Andrew', 'Srikar', 'mooch', 'kitten'],
    printGuestList: function(){
        // this is used for accesing original object
        console.log('Guest list for' + this.name)
        
        // The this binding doesnt work inside the console log. Here we can use arrow functions as they dont bind their own this value
        // this.guestList.forEach(function(guest){
        //     console.log(guest + ' ' + this.name)  
        // })
        

        this.guestList.forEach((guest) =>{
            console.log(guest + ' ' + this.name)  
        })
    
    },
    // arrow functions dont bind their own 'this' value
    print: () => console.log('Guest list for' + this.name),

    // New function definition in ES6 method
    prints(){
        console.log('Guest list for' + this.name)

        this.guestList.forEach((guest) =>{
            console.log(guest + ' ' + this.name)  
        })
    
    }
}

// event.printGuestList()
// event.print()
event.prints()