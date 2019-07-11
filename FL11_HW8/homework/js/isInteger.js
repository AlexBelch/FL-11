function isInteger(a) {
    return typeof a === 'number' && Math.floor(a) === a;
}

console.log(isInteger(7));
console.log(isInteger(7.5));
console.log(isInteger(7.0));
