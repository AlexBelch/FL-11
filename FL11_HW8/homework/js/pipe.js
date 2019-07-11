function addOne(a) {
    return a + 1;
}

function pipe() {
    let res = arguments[0];
    for (let i = 1; i< arguments.length; i++) {
        res = arguments[i].valueOf()(res);
    }
    return res;
}

console.log(pipe(1, addOne));
console.log(pipe(21, addOne, addOne, addOne, addOne));
