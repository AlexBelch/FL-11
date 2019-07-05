let a = prompt('Please enter number a:');
let b = prompt('Please enter number b:');
let c = prompt('Please enter number c:');

if (a === null ||
    b === null ||
    c === null) {
    console.log('Triangle doesn’t exist');
} else {
    a = parseFloat(a.replace(',','.'));
    b = parseFloat(b.replace(',','.'));
    c = parseFloat(c.replace(',','.'));

    if (isNaN(a) ||
        isNaN(b) ||
        isNaN(c)) {
        console.log('Triangle doesn’t exist');
    } else {
        if (!(a + b > c && a + c > b && b + c > a)) {
            console.log('Triangle doesn’t exist');
        } else if (a === b && b === c) {
            console.log('Equivalent triangle');
        } else if (a === b && b !== c || b === c && c !== a || a === c && c !== b) {
            console.log('Isosceles triangle');
        } else if (a !== b && b !== c && a !== c) {
            console.log('Normal triangle');
        }
    }
}
