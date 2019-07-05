let a1 = prompt('Please enter point a1:');
let a2 = prompt('Please enter point a2:');
let b1 = prompt('Please enter point b1:');
let b2 = prompt('Please enter point b2:');
let c1 = prompt('Please enter point c1:');
let c2 = prompt('Please enter point c2:');

if (a1 === null || a2 === null ||
    b1 === null || b2 === null ||
    c1 === null || c2 === null) {
    console.log(false);
} else {
    a1 = parseFloat(a1.replace(',','.'));
    a2 = parseFloat(a2.replace(',','.'));
    b1 = parseFloat(b1.replace(',','.'));
    b2 = parseFloat(b2.replace(',','.'));
    c1 = parseFloat(c1.replace(',','.'));
    c2 = parseFloat(c2.replace(',','.'));

    if (isNaN(a1) ||
        isNaN(a2) ||
        isNaN(b1) ||
        isNaN(b2) ||
        isNaN(c1) ||
        isNaN(c2)) {
        console.log(false);
    } else {
        const two = 2;
        let d1 = (a1 + b1) / two;
        let d2 = (a2 + b2) / two;

        const precision = 2;
        if (d1.toPrecision(precision)===c1.toPrecision(precision) &&
            d2.toPrecision(precision)===c2.toPrecision(precision)) {
            console.log(true);
        }else {
            console.log(false);
        }
    }
}
