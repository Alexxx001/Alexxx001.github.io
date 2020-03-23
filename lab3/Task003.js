const object1 = {
    name: 'Boris',
    weight: 15
};

const object2 = {
    name: 'Boris',
    weight: 15
};

const object3 = {
    name: 'Rex',
    weight: 20,
};

function isEquivalent(object1, object2) {
    var property1 = Object.getOwnPropertyNames(object1);
    var property2 = Object.getOwnPropertyNames(object2);
    if (property1.length !== property2.length) {
        return false;
    }
    for (var i = 0; i < property1.length; i++) {
         var propertyField = property1[i];

         if (object1[propertyField] !== object2[propertyField]) {
             return false;
         }
    }
    return true;
}

console.log(isEquivalent(object1, object2)); // true
console.log(isEquivalent(object1, object3)); // false