function sum( a, b) {
    return (a+b);
    }
    
let a = 12;
let b= -80;
console.log('Метод sum()');
console.log(sum(a, b)) ;
console.log("========================")

function reverseCase(str){
    reversed='';
    for (let key in str) {
        reversed += str[key] === str[key].toUpperCase() ? str[key].toLowerCase() : str[key].toUpperCase();
    }

    return reversed;
}

let liters = 'This is method REVERSEcASE. bUt HERE is MyTestString';
console.log(reverseCase(liters));
console.log("========================")

function arrayReverse(arr){
    return arr.reverse()
}

function arrayReverse2(arr){
    for (let i in arr){
        [arr[i] , arr[arr.length-i-1] ] = [arr[arr.length-i-1] , arr[i]];
    }
    return arr
}

let myArray = ['first element', true, 2]
console.log('Метод arrayReverse версия 1')
console.log(arrayReverse(myArray))
console.log()
console.log('Метод arrayReverse версия 2')
console.log(arrayReverse2(myArray))