function getMin() {
    const arr = [...arguments];
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (min > arr[i]) {
            min = arr[i];
        }
    }
    return min;
}

console.log(getMin(45,0,5,1,-1,8));
