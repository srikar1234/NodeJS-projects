// Object destructuring
const name = 'Srikar'
const userage = 27

const user ={
    name,
    userage,
    loc: 'Hyderabad'
}
console.log(user)

const product ={
    label: 'Red notes',
    price: 3,
    stock: 200,
    saleprice: undefined,
    rating: 79
}

// Changing the variable name of label to productlabel
// Setting a default value for rating
const {rating = 100, label: productlabel, stock, saleprice = 150} = product

console.log(rating, productlabel, stock, saleprice)

// Instead of sending the whole object, we can destructure it and send what is required
const transaction = (type, { label, stock}) => {
    console.log(label, stock, type)
}
transaction('order', product)