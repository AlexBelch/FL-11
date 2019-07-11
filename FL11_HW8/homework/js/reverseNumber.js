function reverseNumber(a) {
    let str = a.toString();
    let arr = [];
    for (let index = 0; index < str.length; index++) {
        arr[index] = str[index];
    }

    let temp,i,j;
    for (i = 0, j = arr.length - 1; i<j; i++, j--) {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    str = '';
    for (let index = 0; index < arr.length; index++) {
        str = str + arr[index];
    }

    return parseInt(str) * Math.sign(a);
}

console.log(reverseNumber(758));
console.log(reverseNumber(-124));
console.log(reverseNumber(-10000));
