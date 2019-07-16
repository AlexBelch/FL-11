function getNumbers(str) {
    const zero = 0;
    const one = 1;
    const two = 2;
    const three = 3;
    const four = 4;
    const five = 5;
    const six = 6;
    const seven = 7;
    const eight = 8;
    const nine = 9;
    const digits = [zero, one, two, three, four, five, six, seven, eight, nine];

    let arr = [];
    for (let i= 0; i < str.length; i++) {
        for (let j = 0; j < digits.length; j++) {
            if (parseInt(str[i], 10) === digits[j]) {
                arr.push(str[i]);
            }
        }
    }
    return arr;
}
console.log(getNumbers('string'));
console.log(getNumbers('n1um3ber95'));
console.log(getNumbers('0n1um3.5ber-56.95'));

function findTypes() {
    const arr = [...arguments];

    let types = [];
    for (let i = 0; i < arr.length; i++) {
        types.push(typeof arr[i]);
    }

    let result = {};
    for (let i = 0; i < types.length; ++i) {
        let a = types[i];
        if (result[a] !== undefined) {
            ++result[a];
        } else {
            result[a] = 1;
        }
    }
    return result;
}
console.log(findTypes('number'));
const two = 2;
const three = 3; 
const five = 5;
const seven = 7;
const eight = 8;
console.log(findTypes(null, five, 'hello'));
console.log(findTypes(null, five, 'hello', undefined, 'sf', five, five, {}, []));

function executeforEach(arr, func) {
    for (let index = 0; index < arr.length; index++) {
        func(arr[index]);
    }
    return;
}
executeforEach([1,two,three], function(el) { 
    console.log(el) 
}); 
executeforEach([1,two,three], function(el) { 
    console.log(el+1) 
});

function mapArray(arr, func) {
    let result = [];
    executeforEach(arr, function(el) {
        result.push(func(el));
    });
    return result;
}

console.log(mapArray([two, five, eight], function(el) { 
    return el + three 
}));
console.log(mapArray([two, five, eight], function(el) { 
    return (el + three) * two 
}));

function filterArray(arr, func) {
    let result = [];
    executeforEach(arr, function(el) {
        if (func(el)) {
            result.push(el);
        }
    });
    return result;
}
console.log(filterArray([two, five, eight], function(el) {
     return el > three 
})); 
console.log(filterArray([two, five, five, seven, eight], function(el) { 
    return el < five 
}));

function showFormattedDate(date) {
    const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `Date:${monthes[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}
console.log(showFormattedDate(new Date('2019-01-27T01:10:00')));
console.log(showFormattedDate(new Date('2019-07-14T01:10:00')));

function canConvertToDate(date) {
    let newDate = new Date(date);
    if (newDate.toString() === 'Invalid Date') {
        return false;
    } else {
        return true;
    }
}
console.log(canConvertToDate('2016-13-18T00:00:00'));
console.log(canConvertToDate('2016-03-18T00:00:00'));
console.log(canConvertToDate('2019-07-14T01:00:00'));

const thousand = 1000;
const sixty = 60;
const twentyFour = 24;
function daysBetween(date1, date2) {
    return Math.round((date2-date1)/(thousand*sixty*sixty*twentyFour));
}
console.log(daysBetween(new Date('2016-03-18T00:00:00'),new Date('2016-04-19T00:00:00')));
console.log(daysBetween(new Date('2019-06-01T00:00:00'),new Date('2019-07-14T00:00:00')));

const data = [
  {
    '_id': '5b5e3168c6bf40f2c1235cd6',
    'index': 0,
    'birthday ': '2016-03-18T00:00:00',
    'eyeColor': 'green',
    'name': 'Stein',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e3168e328c0d72e4f27d8',
    'index': 1,
    'birthday ': '1991-02-11T00:00:00',
    'eyeColor': 'blue',
    'name': 'Cortez',
    'favoriteFruit': 'strawberry'
  },
  {
    '_id': '5b5e3168cc79132b631c666a',
    'index': 2,
    'birthday ': '1984-04-17T00:00:00',
    'eyeColor': 'blue',
    'name': 'Suzette',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e31682093adcc6cd0dde5',
    'index': 3,
    'birthday ': '1994-04-17T00:00:00',
    'eyeColor': 'green',
    'name': 'George',
    'favoriteFruit': 'banana'
  }
];

const daysofYear = 365;
const eighteen = 18;
function getAmountOfAdultPeople(data) {
    return filterArray(data, function(el) {
        let year = Math.round(daysBetween(new Date(el['birthday ']), new Date())/daysofYear);
        if (year > eighteen) {
            return el;
        }
    }).length;
}
console.log(getAmountOfAdultPeople(data)); 

function keys(obj) {
    const result = [];
    for(let propertyName in obj) {
        if ({}.hasOwnProperty.call(obj, propertyName)) {
            result.push(propertyName);
        }
    }
    return result;
}
console.log(keys({keyOne: 1, keyTwo: 2, keyThree: 3}));
console.log(keys(data[0]));

function values(obj) {
    const result = [];
    for(let propertyName in obj) {
        if ({}.hasOwnProperty.call(obj, propertyName)) {
            result.push(obj[propertyName]);
        }
    }
    return result;
}
console.log(values({keyOne: 1, keyTwo: 2, keyThree: 3}));
console.log(values(data[0]));
