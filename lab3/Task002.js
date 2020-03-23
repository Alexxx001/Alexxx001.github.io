function sum() {
    var result = 0;
    if (Array.isArray(this) == false)
        return false;
    for (var i = 0; i <= this.length; i++){
        if (isNaN(this[i])) {
            continue;
        }
        result += this[i];
    }
    return result;
}

console.log(sum.call([5, 5, 5, 5, 5, 5, 5, 5, 5]));
